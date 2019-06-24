
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
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        case 'CLEAR_TAGS':
            return [];
        default:
            return state;
    }
}

const isLoggedIn = (state = false, action) => {
    switch (action.type) {
        case 'LOG_IN':
           return true;
        case 'LOG_OUT': 
            return false;
        default: 
            return state;
    }
}

const reducers = {
    movies,
    genres, 
    selectedMovie,
    isLoggedIn,
}

export default reducers