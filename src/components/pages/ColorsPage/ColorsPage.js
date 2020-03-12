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
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ColorsPage extends Component {
    state = {
        newColor: {
            userId: this.props.user.id,
            label: '',
            hex_code: '',
        }
    }
    componentDidMount() {
        // console.log(chroma('red').hex());
        this.props.dispatch({
            type: 'GET_COLORS',
            payload: this.state.newColor.userId
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
        event.preventDefault();
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
                        >Delete</Button></TableCell>
                    </TableRow>
                </TableBody>
            )
        })
        return (
            <div className="container1">
                <h2>Add A Color</h2>
                <form onSubmit={this.addNewColor}>
                    {/* <input type='text' placeholder='Label' value={this.state.newColor.label}
                    onChange={(event) => this.handleInputChange(event, 'label')} /> */}
                    <TextField type='text' value={this.state.newColor.hex_code}
                    variant='outlined'
                    type='text'
                    label='Type Color'
                    onChange={(event) => this.handleInputChange(event, 'hex_code')} />
                    <Button type='submit' value='Add New Color' 
                    variant='contained'
                    color='primary'
                    >Add Color</Button>
                </form>
                <h2>Color Settings</h2>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px' }}>Label</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px'  }}>Hex Code</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px'  }}>Block</TableCell>
                            <TableCell style={{ color: 'whitesmoke', fontSize: '24px'  }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                        {colorList}
                </Table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(ColorsPage);