import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import './Details.css'

class DetailsView extends Component {
    render() {
        if (this.props.selectedMovie.isSelected === false) {
            return <Redirect to='/' />
        } else {
            return (
                <>
                    <Grid container id="detailsContainer">
                        <Grid item xs={5} id="imageWrapper">
                            <img alt={this.props.selectedMovie.movie.title} src={this.props.selectedMovie.movie.poster} />
                        </Grid>
                        <Grid item xs={7}>
                            <h2>{this.props.selectedMovie.movie.title}</h2>
                            <p>{this.props.selectedMovie.movie.description}</p>
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
                    {/* <pre>
                        {JSON.stringify(this.props.selectedMovie.movie, null, 2)}
                    </pre> */}
                </>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    selectedMovie: reduxState.selectedMovie,
})

export default connect(mapReduxStateToProps)(DetailsView)