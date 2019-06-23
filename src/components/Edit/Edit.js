import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'

import './Edit.css'

class Edit extends Component {
    state = {
        title: '',
        description: '',
        haveGenres: false,
    }

    componentDidMount() {
        console.log('EDIT PAGE MOUNTED');
        const genreArray = this.props.genres.map(genre => {
            return { [genre.name]: true, };
        })
        console.log(genreArray);
        let genreObject = {};
        genreArray.forEach(object => {
            console.log(object)
            genreObject = { ...genreObject, ...object }
        })
        console.log(genreObject);
        // if (this.props.movies[0].title !== '') {
        //     console.log('setting edit page state');
        //     this.setState({
        //         title: this.props.movies[this.props.movieId-1].title,
        //         description: this.props.movies[this.props.movieId-1].description,
        //     })
        // }
        if (this.props.genres[0].name !== '') {
            this.setState({
                title: this.props.movies[this.props.movieId - 1].title,
                description: this.props.movies[this.props.movieId - 1].description,
                haveGenres: true,
                genreObject: genreObject,
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state, [event.target.id]: event.target.value
        })
    }

    updateGenres = (event) => {
        this.setState({
            ...this.state,
            genreObject: {
                ...this.state.genreObject, [event.target.id]: event.target.checked
            }
        })
    }
    handleSubmit = () => {
        console.log(this.state);
        this.props.dispatch({
            type: 'UPDATE_MOVIE',
            payload: { ...this.state, id: this.props.movieId }
        })
        this.props.history.push('/details');
    }

    cancelEdit = () => {
        return this.props.history.push('/details');
    }

    render() {
        if (this.props.isSelected === false) {
            return <Redirect to='/' />
        } else {
            return (
                <>
                    <pre>
                        {JSON.stringify(this.state, null, 2)}
                    </pre>
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
                            <Grid item xs={12}>
                                <h4>Remove Tagged Genres</h4>
                                {this.state.haveGenres ?
                                    <>
                                        {this.props.genres.map(genre => 
                                            <FormControlLabel
                                                key={genre.name}
                                                control={
                                                    <Checkbox 
                                                        checked={this.state.genreObject[genre.name]} 
                                                        onChange={this.updateGenres} 
                                                        value={genre.name}
                                                        id={genre.name} 
                                                        key={genre.name} 
                                                    />
                                                        
                                                }
                                                label={genre.name}
                                            />
                                            
                                        )}
                                    </>
                                    :
                                    <></>
                                }
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
                        {JSON.stringify(this.props.genres, null, 2)}
                    </pre>
                </>
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

export default connect(mapReduxStateToProps)(Edit)