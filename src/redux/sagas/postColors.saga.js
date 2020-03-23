import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postColors(action) {
    console.log('In postColors');
    const userId = action.payload.userId;
    // const hex_code= action.payload.hex_code;
    // const
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/colorsPost',
            data: action.payload
        })
        yield put({
            type: 'GET_COLORS',
            payload: userId
        });
    } catch(err) {
        console.log('Error posting color', err);
    }
}
function* postColorsSaga() {
    yield takeLatest('ADD_COLORS', postColors);
}

export default postColorsSaga;