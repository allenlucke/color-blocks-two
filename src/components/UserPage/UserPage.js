import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../LogOutButton/LogOutButton';

import '../UserPage/UserPage.css'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace 
// the component name TemplateClass with the name for the new 
// component.
class UserPage extends Component {
    state = {
        // heading: `Some heading`
    }
    
    render() {
        return (
            <div>
                <h1 id="welcome">
                    Welcome, { this.props.store.user.username }!
                </h1>
                {/* <p>Your ID is: {this.props.store.user.id}</p> */}
                <LogOutButton className="log-in" />
                {/* <h2>{this.state.heading}</h2> */}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserPage);