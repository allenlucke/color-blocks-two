import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import AddBySearchColorsModal from '../ColorsPage/AddBySearchColorsModal';


//Material UI
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Sweet Alerts
import Swal from 'sweetalert2';

import './ColorsPage.css';


class ColorsSearchResultsPage extends Component {
    state = {

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
                        <TableCell >
                            <AddBySearchColorsModal colorItem = {item}/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            )
        })

        return (
            <div className="container1">
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

export default connect(mapStoreToProps)(ColorsSearchResultsPage);