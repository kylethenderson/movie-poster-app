import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieItem.css';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

class MovieItem extends Component {

    // on click of the button, dispatch the id to the
    // reducer to hold the id for use later
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
                    <Card elevation={5} className="text-center my-10">
                        <CardContent>
                            <img alt={this.props.movie.title} src={this.props.movie.poster} />
                            <h2 className="text-center">{this.props.movie.title}</h2>
                            <Typography variant="subtitle1">Description:</Typography>
                            <Typography noWrap>{this.props.movie.description}</Typography>
                        </CardContent>
                        <Link to="/details">
                            <Button variant="contained" onClick={this.setSelectedMovie} color="primary" >Details</Button>
                        </Link>
                    </Card>
                </Grid>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieItem)