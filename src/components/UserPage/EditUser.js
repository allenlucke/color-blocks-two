import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';

import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card.js";

class EditUser extends Component {

    state = {
        checkbox: false
    }

    // allow checkbox to have blue check mark
    handleCheckboxChange = (event, id) => {
        this.setState({
            checkbox: !this.state.checkbox,
            id,
        })
    }


    render() {
        let checkBe = this.state.checkbox;

        if (this.props.masterUncheck === true) {
            checkBe = false;
        }

        return (
            <GridContainer>
                <Grid>
                    <Paper>
                        <TableRow>
                            <TableCell align="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkBe}
                                            onChange={(event) => this.handleCheckboxChange(event, this.props.item.id)}
                                            color="primary"
                                        />
                                    }
                                />
                            </TableCell>
                            <TableCell>{this.props.item.firstName}</TableCell>
                            <TableCell>{this.props.item.lastName}</TableCell>
                            <TableCell>{this.props.item.phoneNumber}</TableCell>
                            <TableCell>{this.props.item.email}</TableCell>
                            <TableCell>{this.props.item.securityLevel}</TableCell>
                        </TableRow>
                    </Paper>
                </Grid>
            </GridContainer>
        );
    }
}

export default connect(mapStoreToProps)(EditUser);
