import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import chroma from 'chroma-js';

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

class AdminPage extends Component {
    state = {

    }
    render () {
        return (
            <div>

            </div>
        )
    }
}

export default connect(mapStoreToProps)(AdminPage);