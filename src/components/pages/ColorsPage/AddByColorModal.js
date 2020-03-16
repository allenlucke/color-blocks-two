import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import chroma from 'chroma-js';

//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
//Sweet Alerts
import Swal from 'sweetalert2';

import './AddByColorModal.css';

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
        // this.closeModal();
        if (chroma.valid(this.state.newColor.hex_code) == true ) {
            event.preventDefault();
            this.closeModal();
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
                this.closeModal();
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
                        Add A Color By Name
                    </Button>
                </div>
                <div>
                    <Modal
                        height="100%"
                        width="100%"
                        open={this.state.setOpen}
                        onClose={this.closeModal}>
                        <div className="addByColorModal">
                            <h2 className='modalHdr'>Modal</h2>
                            <form onSubmit={this.addNewColor}>
                                <TextField type='text' value={this.state.newColor.hex_code}
                                variant='outlined'
                                type='text'
                                label='Name of Color'
                                onChange={(event) => this.handleInputChange(event, 'hex_code')} />
                                <Button type='submit' value='Add New Color' 
                                variant='contained'
                                color='primary'
                                style={{ marginLeft: '20px', height: '55px', flex: '1' }}
                                >Add Color</Button>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default connect(mapStoreToProps)(AddByColorModal);