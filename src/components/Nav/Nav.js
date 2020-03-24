import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/home',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/registration';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Color Blocks</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {props.store.user.securityLevel >= 10 && (
              //Page only accessible to admins
              <Link className="nav-link" to="/admin">
              Admin Page
              </Link>
            )}
            <Link className="nav-link" to="/info">
              Info Page
            </Link>
            <Link className="nav-link" to="/user">
              User Page
            </Link>
            <Link className="nav-link" to="/blocks">
              Blocks Page
            </Link>
            <Link className="nav-link" to="/colors">
              Colors Page
            </Link>
            <LogOutButton className="nav-link"/>
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
