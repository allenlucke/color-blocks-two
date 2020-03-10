import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//Style
import './BlocksPage.css'

//Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class BlocksPage extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_BLOCKS'
        })
        this.props.dispatch({
            type: 'GET_COLORS'
        })
    }
    
    deleteBlock = (event, id) => {
        this.props.dispatch({
            type: 'DELETE_BLOCK',
            payload: id
        })
        this.props.dispatch({
            type: 'GET_BLOCKS',
        })
    }
    addBlock = (event, item) => {
        this.props.dispatch({
            type: 'ADD_BLOCK',
            payload: item
        })
        this.props.dispatch({
            type: 'GET_BLOCKS',
        })
    }

    render() {
        const colorBlocks = this.props.store.getBlocksReducer.map((item, index) => {
            const el = `#${item.hex_code}`
            const block = <div style= {{backgroundColor: el }} className="box"></div>;
            return(
                <div key={index} className="swatchesBody">
                    {block}
                    <h4 className="label">{item.label}</h4>
                    <div className="label">
                        <button onClick={(event) =>this.deleteBlock(event, item.id)}>DELETE</button>
                    </div>
                </div>
            )
        })
        const colorButtons = this.props.store.getColorsReducer.map((item, index) => {
            const el = `#${item.hex_code}`
            console.log(el)
            return(
                <div key={index} className="swatchesBody">
                    <button 
                        className="colorButton"
                        style= {{backgroundColor: el }}
                        onClick={(event) => this.addBlock(event, item)}>
                        Add a {item.label} Box
                    </button>
                </div>
            )
        })
        return (
            <div className="container1">
                {colorButtons}
                <h2>Color Swatches</h2>
                {colorBlocks}
            </div>
        )
    }
}

export default connect(mapStoreToProps)(BlocksPage);