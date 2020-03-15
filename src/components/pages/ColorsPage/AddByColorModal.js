import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import chroma from 'chroma-js';

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

class AddByColorModal extends Component {
    state = {
        setOpen: false,
        newColor: {
            userId: this.props.user.id,
            label: '',
            hex_code: '',
        }
    };

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
    handleInputChange = (event, inputKey) => {
        this.setState({
            newColor: {
                ...this.state.newColor,
                [inputKey]: event.target.value
            }
        });
    }
    addNewColor = (event, inputKey) => {
        if (chroma.valid(this.state.newColor.hex_code) == true ) {
            event.preventDefault();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Success, ${this.state.newColor.hex_code} has been added!`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                this.props.dispatch({
                    type: 'ADD_COLORS',
                    payload: {
                        userId: this.state.newColor.userId,
                        label: this.state.newColor.hex_code,
                        hex_code: chroma(this.state.newColor.hex_code).hex()
                    } })
                    this.setState({
                        newColor: {
                            userId: this.state.newColor.userId,
                            label: '',
                            hex_code: '',
                        }
                    })
            })}
            else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oh No! We do not recognize that color, sorry.',
                    text: `Please try another color, or choose another input option.`,
                    timer: 2500
                })
            }
    }
    render() {
        return (
            <div className="container">
                <div className="modal-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.openModal}
                    >
                        Open Modal
                    </Button>
                </div>
                <div>
                    <Modal
                        open={this.state.setOpen}
                        onClose={this.closeModal}>
                        <div className="modalPrime">
                            <h2>Modal</h2>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default connect(mapStoreToProps)(AddByColorModal);