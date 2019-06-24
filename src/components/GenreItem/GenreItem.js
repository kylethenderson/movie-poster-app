import React, { Component } from 'react'

class GenreItem extends Component {
    render() {
        return (
            <li>{this.props.genre.name}</li>
        )
    }
}

export default GenreItem;