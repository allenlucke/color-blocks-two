import React, { Component } from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage}
        <form onSubmit={this.registerUser}
              className="loginForm">
          <Paper
            className="paper"
          >
            <h1>Register User</h1>
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
                className="register"
                type="submit"
                name="submit"
                value="Register"
                style={{ marginLeft: '190px', marginTop: '60px', flex: '1' }}
                variant='contained'
                color='primary'
              >
                Register
              </Button>
            </div>
          </Paper>
        </form>
        <center>
          <Button
            type="button"
            variant="contained"
            color="primary"
            // className="link-button"
            style={{marginTop: '130px', marginRight: '55px'}}
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);

