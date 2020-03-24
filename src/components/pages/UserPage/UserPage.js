import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import LogOutButton from '../../LogOutButton/LogOutButton';

import './UserPage.css'


class UserPage extends Component {
    state = {
        userId: this.props.user.id,
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_POINTS',
            payload: this.state.userId,
        })
    }
    
    render() {
        return (
            <div className="container1">
                <h1>
                    Welcome, { this.props.store.user.username }!
                </h1>

                <h2>Your Current Level: </h2>
                <h2>Your Current Points: </h2>
                <h2>Points to next Level: </h2>
                <h2>Blocks Added: </h2>
                <h2>Colors Added By Name: </h2>
                <h2>Colors Added By Hex Code: </h2>
                <h2>Total Colors Added: </h2>
                <h2></h2>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserPage);