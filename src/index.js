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
}



function* fetchMovies() {
    try {
        const movieListResponse = yield axios.get('/api/movies')
        yield put({ type: 'SET_MOVIES', payload: movieListResponse.data })
    } catch (error) {
        console.log('Error with getting movies', error)
    }
}

function* updateMovie(action) {
    try {
        yield axios.put('/api/movies', action.payload)
        yield put({type:'FETCH_MOVIES'})
    } catch(error) {
        console.log('Error in updating movie', error);
    }
}



// Used to store movies returned from the server
const movies = (state = [{title: ''}], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovieStart = {
    movie: {},
    isSelected: false
}

const selectedMovie = (state = selectedMovieStart, action) => {
    switch (action.type) {
        case 'SELECT_MOVIE':
            return {
                movie: action.payload,
                isSelected: true,
            };
        default:
            return state
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
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
