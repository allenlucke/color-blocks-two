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
        const userData = this.props.store.getPointsReducer.map((item, index) => {
            return(
                <div key={index}>
                    <h2>Your Current Level: {item.user_levels}</h2>
                    <h2>Your Current Points: {item.points}</h2>
                    <h2>Points to next Level: {item.pointsNeeded}</h2>
                    <h2>Blocks Added: {item.totalBlocks}</h2>
                    <h2>Colors Added By Name: {item.colorsAddedByName}</h2>
                    <h2>Colors Added By Hex Code: {item.colorsAddedByHex}</h2>
                    <h2>Colors Added By Search: {item.colorsAddedBySearch}</h2>
                    <h2>Total Colors Added: {item.totalColors}</h2>
                </div>
            )
        })
        return (
            <div className="container1">
                <h1>
                    Welcome, { this.props.store.user.username }!
                </h1>

                <div>
                    {userData}
                </div>
                
                <h2></h2>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserPage);