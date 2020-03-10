import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class ColorsPage extends Component {
    state = {
        newColor: {
            userId: this.props.user.id,
            label: '',
            hex_code: '',
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_COLORS',
            payload: this.state.newColor.userId
        })
    }
    handleInputChange = (event, inputKey) => {
        this.setState({
            newColor: {
                ...this.state.newColor,
                [inputKey]: event.target.value
            }
        });
    }
    addNewColor = (event, inputKey) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_COLOR',
            payload: this.state.newColor })
            console.log()
            this.setState({
                newColor: {
                    label: '',
                    hex_code: '',
                }
            })
            this.props.dispatch({
                type: 'GET_COLORS'
            })
    }
    render() {
        const colorList = this.props.store.getColorsReducer.map((item, index) => {
            const el = `#${item.hex_code}`
            return(
                <tbody key={index}>
                    <tr>
                        <td>{item.label}</td>
                        <td>{item.hex_code}</td>
                        <td style= {{backgroundColor: el }} ></td>
                        <td><button>Delete</button></td>
                    </tr>
                </tbody>
            )
        })
        return (
            <div>
                <h2>Add A Color</h2>
                <form onSubmit={this.addNewColor}>
                    <input type='text' placeholder='Label' value={this.state.newColor.label}
                    onChange={(event) => this.handleInputChange(event, 'label')} />
                    <input type='text' placeholder='Hex Code' value={this.state.newColor.hex_code}
                    onChange={(event) => this.handleInputChange(event, 'hex_code')} />
                    <input type='submit' value='Add New Color' />
                </form>
                <h2>Color Settings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Hex Code</th>
                            <th>Block</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                        {colorList}
                </table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(ColorsPage);