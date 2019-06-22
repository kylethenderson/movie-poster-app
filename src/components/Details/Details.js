import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'

class DetailsView extends Component {
    render() {
        if (this.props.reduxState.selectedMovie === 0) {
            return <Redirect to='/' />
        } else {
            return (
                <>
                    <Link to="/">
                        <Button variant="contained" color="primary">Back to List</Button>
                    </Link>
                    <Link to="/edit">
                        <Button variant="contained" color="primary">Edit</Button>
                    </Link>
                    {JSON.stringify(this.props.reduxState.selectedMovie, null, 2)}
                    {JSON.stringify(this.props.reduxState.movies[this.props.reduxState.selectedMovie - 1], null, 2)}
                    <h2>{this.props.reduxState.movies[this.props.reduxState.selectedMovie - 1].title}</h2>
                    <p>{this.props.reduxState.movies[this.props.reduxState.selectedMovie - 1].description}</p>
                </>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(DetailsView)