import { combineReducers } from 'redux';

//Sweet Alerts
import Swal from 'sweetalert2';
// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Enter your username and password!',
        timer: 2500
      })
    case 'LOGIN_FAILED':
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops! The username and password didn\'t match. Try again!',
        timer: 2500
      })
    case 'LOGIN_FAILED_NO_CODE':
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops! Something went wrong! Is the server running?',
        timer: 2500
      })
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Choose a username and password!',
        timer: 2500
      })
    case 'REGISTRATION_FAILED':
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops! That didn\'t work. The username might already be taken. Try again!',
        timer: 2500
      })
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});
