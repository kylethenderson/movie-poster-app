import React, { Component } from 'react'
import { connect } from 'react-redux' 

class MovieList extends Component {
    componentDidMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        this.props.dispatch({type: 'FETCH_MOVIES'});
    }

    render() {
        return (
            <>
                <pre>
                    {JSON.stringify(this.props, null, 2)}
                </pre>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(MovieList)