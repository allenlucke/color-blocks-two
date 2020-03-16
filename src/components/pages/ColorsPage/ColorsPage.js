import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import chroma from 'chroma-js';
import AddByColorModal from './AddByColorModal'

//Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Sweet Alerts
import Swal from 'sweetalert2';

import './ColorsPage.css';

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
    deleteColor = (event, id) => {
        event.preventDefault();
        Swal.fire({
            title: 'Delete Color',
            text: 'Are you sure you want to delete this color?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete It!'
        }).then(result => {
            if(result.value) {
                Swal.fire(
                    'Deleted',
                    'Your color has been deleted!',
                );
                this.props.dispatch({
                    type: 'PUT_COLORS',
                    payload: {
                        colors_userId: id,
                        userId: this.props.user.id               
                    }
                })
            }
        })
    }
    render() {
        const colorList = this.props.store.getColorsReducer.map((item, index) => {
            const el = `${item.hex_code}`
            return(
                <TableBody hover className='table-row' key={index}>
                    <TableRow hover>
                        <TableCell style={{ color: 'whitesmoke', fontSize:'18px'}}>{item.label}</TableCell>
                        <TableCell style={{ color: 'whitesmoke', fontSize: '18px' }}>{item.hex_code}</TableCell>
                        <TableCell style= {{backgroundColor: el }} ></TableCell>
                        <TableCell><Button
                            variant='contained'
                            color='secondary'
                            onClick={(event) => this.deleteColor(event, item.id)}
                        >Delete</Button></TableCell>
                    </TableRow>
                </TableBody>
            )
        })
        return (
            <div className="container1">
                <h2>Add A Color</h2>
                <AddByColorModal className='modalBtn'/>
                <h2>Color Settings</h2>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Label</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Hex Code</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Block</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                        {colorList}
                </Table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(ColorsPage);