import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SearchResultsModal from './SearchResultsModal';

//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
//Sweet Alerts
import Swal from 'sweetalert2';

import './ColorsPage.css';

class SearchColorsModal extends Component {
    state = {
        setOpen: false,
        colorToSearch: {
            label: '',
        },
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
            colorToSearch: {
                ...this.state.colorToSearch,
                [inputKey]: event.target.value
            }
        });
    }
    searchColor = (event, inputKey) => {
        event.preventDefault();
        this.closeModal();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Let me have a look`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            this.props.dispatch({
                type: 'SEARCH_COLORS',
                payload: {
                    label: this.state.colorToSearch.label,
                }
            })
            this.setState({
                colorToSearch: {
                    label: '',
                }
            })
        })
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
                        Search for Color
                    </Button>
                </div>
                <div>
                    <Modal
                        height="100%"
                        width="100%"
                        open={this.state.setOpen}
                        onClose={this.closeModal}>
                            <div className="addByColorModal">
                                <h2 className='modalHdr'>Add your color by name</h2>
                                <form onSubmit={this.searchColor}>
                                    <TextField type='text' value={this.state.colorToSearch.label}
                                        variant='outlined'
                                        type='text'
                                        label='Name of Color'
                                        onChange={(event) => this.handleInputChange(event, 'label')} />
                                    <Button type= 'submit' value='Enter Color Name'
                                        variant='contained'
                                        color='primary'
                                        style={{ marginLeft: '20px', height: '55px', flex: '1' }}
                                    >Search For Color</Button>
                                </form>
                            </div>
                        </Modal>
                </div>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(SearchColorsModal);