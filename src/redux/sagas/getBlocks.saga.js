import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getBlocks(action) {
    console.log('In getSwatches');
    const userId = action.payload
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/blocks/' + userId
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