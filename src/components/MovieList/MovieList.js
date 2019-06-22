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
                <>
                    <pre>
                        {/* {JSON.stringify(this.props.reduxState.movies, null, 2)} */}
                    </pre>
                    {this.props.reduxState.movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
                </>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieList)