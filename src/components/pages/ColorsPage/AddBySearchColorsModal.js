import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import chroma from 'chroma-js';
import SearchResultsPage from './SearchResultsPage';

//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
//Sweet Alerts
import Swal from 'sweetalert2';

import './ColorsPage.css';


class AddBySearchColorsModal extends Component {
    state = {
        setOpen: false,
        newColor: {
            userId: this.props.user.id,
            label: '',
            hex_code: this.props.colorItem.hex_code,
            achievementsId: 4,
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
        console.log(this.props.colorItem.hex_code)
        this.setState({
            newColor: {
                ...this.state.newColor,
                [inputKey]: event.target.value,
                hex_code: this.props.colorItem.hex_code
            }
        });
    }
    addNewColor = (event, inputKey) => {
        event.preventDefault();
        this.closeModal();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Success, ${this.state.newColor.label} has been added!`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // this.setState({
            //     hex_code: this.props.colorItem.hex_code
            // })
            this.props.dispatch({
                type: 'ADD_COLORS',
                payload: {
                    userId: this.state.newColor.userId,
                    label: this.state.newColor.label,
                    hex_code: this.state.newColor.hex_code,
                    achievementsId: this.state.newColor.achievementsId,
                } })
                this.setState({
                    newColor: {
                        userId: this.state.newColor.userId,
                        label: '',
                        hex_code: '',
                        achievementsId: 4,
                    }
                })
        })
    }
    render() {
        return (
            <div >
                <div className="modal-button">
                    <Button
                        // style={{padding: '0px'}}
                        variant="contained"
                        color="primary"
                        onClick={this.openModal}
                    >
                        Add this Color
                    </Button>
                </div>
                <div>
                    <Modal
                        height="100%"
                        width="100%"
                        open={this.state.setOpen}
                        onClose={this.closeModal}>
                        <div className="addByColorModal">
                            <h2 className='modalHdr'>Would you like to rename this color?</h2>
                            <form onSubmit={this.addNewColor}>
                                <TextField type='text' value={this.state.newColor.label}
                                variant='outlined'
                                type='text'
                                label='Name of Color'
                                onChange={(event) => this.handleInputChange(event, 'label')} />
                                {/* <TextField type='text' value={this.state.newColor.hex_code}
                                variant='outlined'
                                type='text'
                                label='Hex Code'
                                onChange={(event) => this.handleInputChange(event, 'hex_code')} /> */}
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
export default connect(mapStoreToProps)(AddBySearchColorsModal);