import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    // on click of login, make sure credentials state in redux aren't empty, then set login to true and redirect to admin page
    handleLogin = () => {
        if (this.state.username === 'camera' && this.state.password === 'action') {
            this.props.dispatch({
                type: 'LOG_IN',
            })
            this.props.history.push('/admin')
            // clear stored input once the "logged in" state is set to true
            this.setState({
                username: '',
                password: ''
            })
        } else {
            // otherwise, alert the user to enter user and pass
            alert('Please enter correct Username and Password');
        }
    }

    // set the credentials state in the redux store when user enters username or password
    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })
    }

    // basic login form for user
    render() {
        return (
            <Grid container alignItems="center" justify="center">
                <Grid item xs={6}>
                    <Card id="mainCard" elevation={3}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={10}>
                                <TextField
                                    autoComplete="off"
                                    required
                                    id="username"
                                    label="UserName"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    className="login-input"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={10}>
                                <TextField
                                    autoComplete="off"
                                    required
                                    id="password"
                                    type="password"
                                    label="Password"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    className="login-input"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={10}>
                                {this.state.username !== '' && this.state.password !== '' ?
                                    <Button variant="contained" color="primary" size="large" onClick={this.handleLogin}>Log In</Button>
                                    :
                                    <Button disabled variant="contained" color="primary" size="large" onClick={this.handleLogin}>Log In</Button>
                                }
                            </Grid>
                        </Grid>
                        <p id="loginAsterisk">*not a real login form. just enter anything.</p>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState: reduxState
})

export default connect(mapReduxStateToProps)(Login)