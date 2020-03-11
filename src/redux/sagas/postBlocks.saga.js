import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postBlocks(action) {
    console.log('In getSwatches');
    const userId = action.payload
    try {
        const response = yield axios({
            method: 'POST',
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
function* postBlocksSaga() {
    yield takeLatest('ADD_BLOCKS', postBlocks);
}

export default postBlocksSaga;