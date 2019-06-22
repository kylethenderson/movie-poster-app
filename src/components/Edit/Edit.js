import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Edit extends Component {
    state = {
        title: '',
        description: '',
    }

    componentDidMount() {
        if ( this.props.reduxState.movies[0].title !== '' ) {
            this.setState({
                title: this.props.reduxState.movies[this.props.reduxState.selectedMovie - 1].title,
                description: this.props.reduxState.movies[this.props.reduxState.selectedMovie - 1].description,
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state, [event.target.id]: event.target.value
        })
    }

    handleSubmit = () => {
        this.props.dispatch({
            type: 'UPDATE_MOVIE',
            payload: {...this.state, id: this.props.reduxState.selectedMovie}
        })
        this.props.history.push('/');
    }

    render() {
        if (this.props.reduxState.selectedMovie === 0) {
            return <Redirect to='/' />
        } else {
            return (
                <>
                    {JSON.stringify(this.props.reduxState.selectedMovie, null, 2)}
                    <input onChange={this.handleChange} id="title" value={this.state.title} />
                    <textarea onChange={this.handleChange} id="description" value={this.state.description} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapReduxStateToProps)(Edit)