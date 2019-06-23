import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies)
    yield takeEvery('UPDATE_MOVIE', updateMovie)
    yield takeEvery('SELECT_MOVIE', selectMovie)
    yield takeEvery('DELETE_GENRES', deleteGenres)
}


// generator function to get all the movies from the db
function* fetchMovies() {
    try {
        const movieListResponse = yield axios.get('/api/movies')
        yield put({ type: 'SET_MOVIES', payload: movieListResponse.data })
    } catch (error) {
        console.log('Error with getting movies', error)
    }
}

// generator function to update title and description 
// in the db. action.payload is an object from edit.js local state
function* updateMovie(action) {
    try {
        yield axios.put('/api/movies', action.payload)
        yield put({ type: 'DELETE_GENRES', payload: action.payload })
        yield put({ type: 'FETCH_MOVIES' })
        yield put({ type: 'SELECT_MOVIE', payload: action.payload.id})
    } catch (error) {
        console.log('Error in updating movie', error);
    }
}

// setting the single selected movie - action.payload takes a single id
function* selectMovie(action) {
    yield put({ type: 'SET_MOVIE', payload: action.payload })
    yield put({ type: 'CLEAR_TAGS' });
    const movieTags = yield axios.get(`/api/tags?id=${action.payload}`)
    yield put({ type: 'SET_TAGS', payload: movieTags.data })
}

// generator function to delete a genre from the movies_genres table
// action.payload is the object from the updateMovie generator function
function* deleteGenres(action) {
    // console.log(action.payload)
    // loop through all the keys in the genres object from action.payload
    for (let genre in action.payload.genreObject) {
        // if the genreObject has the key in the for...in loop
        if (action.payload.genreObject.hasOwnProperty(genre)) {
            // if the key in the genreObject is false, we want to delete it from the movies_genres table
            if (!action.payload.genreObject[genre]) {
                try {
                    // get the id from the movies_genres table based on genre name and movie id
                    const movieGenreId = yield axios.get(`/api/genres/delete?genre=${genre}&id=${action.payload.id}`)
                    yield axios.delete(`/api/genres/${movieGenreId.data[0].id}`)
                }
                catch (error) {
                    console.log('Error in deleting genre from index', error);
                }
            }
        }
    }
}

// REDUCERS

// reducer to store movies array returned from the server
const movies = (state = [{ title: '' }], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovieStart = {
    movieId: 1,
    isSelected: false
}

// reducer to store the single movie that is clicked from the movie list page
const selectedMovie = (state = selectedMovieStart, action) => {
    switch (action.type) {
        case 'SET_MOVIE':
            return {
                movieId: action.payload,
                isSelected: true,
            };
        default:
            return state
    }
}

// reducer to store the movie genres
const genres = (state = [{ name: '' }], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        case 'CLEAR_TAGS':
            return [];
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        selectedMovie,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
