import React, { Component } from 'react'
import './Header.css'
import Button from '@material-ui/core/Button'

class Header extends Component {
    render() {
        return (
            <header>
                <h1>Saga Movie Weekend!</h1>
                <Button size="small" id="loginButton" variant="contained" onClick={() => { this.props.history.push('/login') }}>Login</Button>
                <Button size="small" id="homeButton" variant="contained" onClick={() => { this.props.history.push('/') }}>Home</Button>
            </header>
        )
    }
}

export default Header