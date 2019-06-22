import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'

import './Edit.css'

class Edit extends Component {
    state = {
        title: '',
        description: '',
    }

    componentDidMount() {
        if (this.props.reduxState.movies[0].title !== '') {
            this.setState({
                title: this.props.reduxState.selectedMovie.movie.title,
                description: this.props.reduxState.selectedMovie.movie.description,
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
            payload: { ...this.state, id: this.props.reduxState.selectedMovie.movie.id }
        })
        this.props.history.push('/');
    }

    cancelEdit = () => {
        return this.props.history.push('/details');
    }

    render() {
        if (this.props.reduxState.selectedMovie.isSelected === false) {
            return <Redirect to='/' />
        } else {
            return (
                <>
                    <Grid container justify="center" id="editWrapper">
                        <Grid id="paperWrapper" container item xs={6} justify="center" alignContent="center" spacing={24}>
                            <Grid item xs={12} >
                                <h2>Edit Movie Details</h2>
                            </Grid>
                            {/* <Paper id="paperWrapper"> */}
                            <Grid item xs={10}>
                                <FormControl fullWidth margin="none">
                                    <TextField
                                        margin="none"
                                        autoComplete="off"
                                        id="title"
                                        label="Title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="none">
                                    <TextField
                                        autoComplete="off"
                                        id="description"
                                        multiline
                                        label="Description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <Button fullWidth variant="contained" onClick={this.cancelEdit}>Cancel</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                            </Grid>

                            {/* </Paper> */}
                        </Grid>
                    </Grid>
                    <pre>
                        {JSON.stringify(this.props, null, 2)}
                    </pre>
                </>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapReduxStateToProps)(Edit)