import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//Style
import './BlocksPage.css'
//Sweet Alerts
import Swal from 'sweetalert2';
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
        Swal.fire({
            title: 'Delete Block',
            text: 'Are you sure you want to delete this block?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete It!'
        }).then(result => {
            if(result.value) {
                Swal.fire(
                    'Deleted',
                    'Your block has been deleted!',
                );
                this.props.dispatch({
                    type: 'PUT_BLOCKS',
                    payload: {
                        id: id,
                        userId: this.props.user.id,
                    }
                })
            }
        })
    }

    addBlock = (event, item) => {
        Swal.fire({
            position: 'center',
                icon: 'success',
                title: `A ${item.label} block has been Added!`,
                text: `Ooh, I like ${item.label}!!!`,
                showConfirmButton: false,
                timer: 1500
        }).then(() => {
            this.props.dispatch({
                type: 'ADD_BLOCKS',       
                payload: {
                    userId: this.props.user.id,
                    colorsId: item.colorsId
                }
            })
        })      
    }

    render() {
        const colorBlocks = this.props.store.getBlocksReducer.map((item, index) => {
            const el = `${item.hex_code}`
            const block = <div style= {{backgroundColor: el }} className="box"></div>;
            return(
                <div key={index} className="swatchesBody">
                    {block}
                    <h4 className="label">{item.label}</h4>
                    <div className="label">
                        <Button onClick={(event) =>this.deleteBlock(event, item.id)}
                        variant='contained'
                        color='secondary'
                        style= {{marginBottom: '40px' }}
                        >DELETE</Button>
                    </div>
                </div>
            )
        })
        const colorButtons = this.props.store.getColorsReducer.map((item, index) => {
            const el = `${item.hex_code}`
            console.log(el)
            return(
                <div key={index} className="swatchesBody">
                    <Button 
                        className="colorButton"
                        style= {{backgroundColor: el, marginBottom: '15px' }}
                        onClick={(event) => this.addBlock(event, item)}
                        variant='contained'>
                        Add a {item.label} Box
                    </Button>
                </div>
            )
        })
        return (
            <div className="container1">
                {colorButtons}
                <h2>Color Blocks</h2>
                {colorBlocks}
            </div>
        )
    }
}

export default connect(mapStoreToProps)(BlocksPage);