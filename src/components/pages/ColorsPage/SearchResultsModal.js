import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';


//Material UI
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Sweet Alerts
import Swal from 'sweetalert2';

import './ColorsPage.css';


class SearchResultsModal extends Component {

    openModal = (event) => {
        this.setState({
            setOpen: true,
        })
    }

    closeModal = (event) => {
        this.setState({
            setOpen: false,
        })
    }

    render() {
        const colorList = this.props.store.searchColorsReducer.map((item, index) => {
            const el = `${item.hex_code}`
            return(
                <TableBody className='table-row' key={index} >
                    <TableRow hover>
                        <TableCell style={{ color: 'whitesmoke', fontSize:'18px'}}>{item.label}</TableCell>
                        <TableCell style={{ color: 'whitesmoke', fontSize: '18px' }}>{item.hex_code}</TableCell>
                        <TableCell style= {{backgroundColor: el }} ></TableCell>
                        <TableCell style={{width: '10rem'}}><Button
                            variant='contained'
                            color='secondary'
                            // onClick={(event) => this.deleteColor(event, item.id)}
                        >Add Color</Button></TableCell>
                    </TableRow>
                </TableBody>
            )
        })

        return (
            <div className="container">
                <div className="modal-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.openModal}
                    >
                        Search for Color
                    </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Color Name</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Hex Code</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Color Image</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Add Color</TableCell>
                        </TableRow>
                    </TableHead>
                        {colorList}
                </Table>
            
            </div>
        )
    }
}

export default connect(mapStoreToProps)(SearchResultsModal);