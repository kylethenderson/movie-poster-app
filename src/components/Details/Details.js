import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import './Details.css'

// Components
import GenreItem from '../GenreItem/GenreItem'


class DetailsView extends Component {
    render() {
        if (this.props.isSelected === false) {
            return <Redirect to='/' />
        } else {
            return (
                <Grid container id="detailsContainer" justify="center">
                    <Grid item xs={4} id="imageWrapper">
                        <img alt={this.props.movies[this.props.movieId - 1].title} src={this.props.movies[this.props.movieId - 1].poster} />
                    </Grid>
                    <Grid item xs={6}>
                        <h2>{this.props.movies[this.props.movieId - 1].title}</h2>
                        <p>{this.props.movies[this.props.movieId - 1].description}</p>
                        <h3>Genres</h3>
                        <ul>
                            {this.props.genres.map(genre => <GenreItem key={genre.name} genre={genre} />)}
                        </ul>
                        <div id="buttonWrapper">
                            <Link to="/">
                                <Button variant="contained" color="primary">Back to List</Button>
                            </Link>
                            <Link to="/edit">
                                <Button variant="contained" color="primary">Edit</Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    isSelected: reduxState.selectedMovie.isSelected,
    movieId: reduxState.selectedMovie.movieId,
    genres: reduxState.genres,
})

export default connect(mapReduxStateToProps)(DetailsView)