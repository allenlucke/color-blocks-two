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
            type: 'GET_BLOCKS',
            payload: this.props.user.id
        })
        this.props.dispatch({
            type: 'GET_COLORS',
            payload: this.props.user.id
        })
    }
    
    deleteBlock = (event, id) => {
        this.props.dispatch({
            type: 'DELETE_BLOCK',
            payload: id
        })
        // this.props.dispatch({
        //     type: 'GET_BLOCKS',
        //     payload: this.props.user.id
        // })
    }
    addBlock = (event, item) => {
        console.log(this.props.user.id);
        console.log(item.id);
        this.props.dispatch({
            type: 'ADD_BLOCKS',
            
            payload: {
                userId: this.props.user.id,
                colorsId: item.id
            }
        })
        // this.props.dispatch({
        //     type: 'GET_BLOCKS',
        //     payload: this.props.user.id
        // })
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
                        <Button onClick={(event) =>this.deleteBlock(event, item.id)}
                        variant='contained'
                        color='secondary'
                        >DELETE</Button>
                    </div>
                </div>
            )
        })
        const colorButtons = this.props.store.getColorsReducer.map((item, index) => {
            const el = `#${item.hex_code}`
            console.log(el)
            return(
                <div key={index} className="swatchesBody">
                    <Button 
                        className="colorButton"
                        style= {{backgroundColor: el }}
                        onClick={(event) => this.addBlock(event, item)}>
                        Add a {item.label} Box
                    </Button>
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