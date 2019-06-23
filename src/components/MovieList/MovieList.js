import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import MovieItem from '../MovieItem/MovieItem'

class MovieList extends Component {
    componentDidMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        this.props.dispatch({ type: 'FETCH_MOVIES' });
    }

    render() {
        if (this.props.reduxState.movies[0].title === '') {
            return <></>
        } else {
            return (
                <div className="movie-list-wrapper">
                    {this.props.reduxState.movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
                </div>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieList)