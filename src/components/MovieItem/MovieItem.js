import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieItem.css';
// import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
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
                <Grid id="movieItemWrapper" container item xs={3} justify="center">
                    <Grid item xs={12} className="text-center">
                        <img alt={this.props.movie.title} src={this.props.movie.poster} />
                    </Grid>
                    <Grid item xs={9} className="text-center" zeroMinWidth>
                        <h2>{this.props.movie.title}</h2>
                        <Typography noWrap>{this.props.movie.description}</Typography>
                    </Grid>
                    <Grid item xs={9} className="text-center">
                        <Link to="/details">
                            <Button variant="contained" onClick={this.setSelectedMovie} color="primary" >Details</Button>
                        </Link>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieItem)