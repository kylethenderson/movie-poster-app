import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieItem.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

class MovieItem extends Component {
    setSelectedMovie = () => {
        this.props.dispatch({
            type: 'SELECT_MOVIE',
            payload: this.props.movie.id
        })
    }

    render() {
        return (
            <>
                <Grid container>
                    <Grid item xs={3} className="poster-wrapper">
                        <img alt={this.props.movie.title} src={this.props.movie.poster} />
                    </Grid>
                    <Grid item xs={9} className="text-wrapper">
                        <h2>{this.props.movie.title}</h2>
                        <p>{this.props.movie.description}</p>
                        <Link to="/details">
                            <Button variant="contained" onClick={this.setSelectedMovie} color="primary" >Details</Button>
                        </Link>
                    </Grid>
                    {/* {JSON.stringify(this.props.movie.title, null, 2)} */}
                </Grid>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieItem)