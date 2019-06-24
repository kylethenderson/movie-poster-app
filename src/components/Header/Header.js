import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Header.css'
import Button from '@material-ui/core/Button'

class Header extends Component {

    logIn = () => {
        this.props.history.push('/login');
    }
    logOut = () => {
        this.props.dispatch({ type: 'LOG_OUT' });
        this.props.history.push('/');
    }
    render() {
        return (
            <header>
                <h1>Saga Movie Weekend!</h1>
                {this.props.isLoggedIn ?
                    <Button size="small" id="loginButton" variant="contained" onClick={this.logOut}>Logout</Button>
                    :
                    <Button size="small" id="loginButton" variant="contained" onClick={this.logIn}>Login</Button>
                }
                <Button size="small" id="homeButton" variant="contained" onClick={() => { this.props.history.push('/') }}>Home</Button>
            </header>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    isLoggedIn: reduxState.isLoggedIn,
})

export default connect(mapStateToProps)(Header);