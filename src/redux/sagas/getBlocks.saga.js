import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getBlocks() {
    console.log('In getSwatches');
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/blocks'
        })
        yield put({
            type: 'SET_BLOCKS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching color blocks', err);
    }
}
function* getBlocksSaga() {
    yield takeLatest('GET_BLOCKS', getBlocks);
}

export default getBlocksSaga;