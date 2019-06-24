import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

// Components
import MovieItem from '../MovieItem/MovieItem'

class MovieList extends Component {

    // on mount, run getMovieList
    componentDidMount() {
        this.getMovieList();
    }

    // dispatch action to fetch all movies
    getMovieList = () => {
        this.props.dispatch({ type: 'FETCH_MOVIES' });
    }

    render() {
        if (this.props.reduxState.movies[0].title === '') {
            return <></>
        } else {
            return (
                <Grid container className="movie-list-wrapper">
                    {this.props.reduxState.movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
                </Grid>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieList)