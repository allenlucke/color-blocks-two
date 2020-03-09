import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  };

  login = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  render() {
    return (
      <div>
        {this.props.store.errors.loginMessage && (
          <h2 className='alert' role='alert'>
            {this.props.store.errors.loginMessage}
          </h2>
        )}
        <form
          onSubmit={this.login}
          className="loginForm"
        >
          <Paper
            className="paper"
          >
            <h1>Login</h1>
            <div>
              <TextField
                type='text' name='username'
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                style={{
                  marginLeft: '150px',
                  marginTop: '30px',
                  marginBottom: '20px',
                  flex: '1'
                }}
                variant='outlined' size='small'
                label='User Name'
                required
              />
            </div>
            <div>
              <TextField
                type='password' name='password'
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                style={{ marginLeft: '150px', marginTop: '30px', flex: '1' }}
                variant='outlined' size='small'
                label='Password'
                required
              />
            </div>
            <div>
              <Button
                className='log-in'
                type='submit'
                name='submit'
                value='Log In'
                style={{ marginLeft: '200px', marginTop: '60px', flex: '1' }}
                variant='contained'
                color='primary'
              >
                Login
              </Button>
            </div>
          </Paper>
        </form>
        <center>
          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{marginTop: '130px', marginLeft: '10px'}}
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);

