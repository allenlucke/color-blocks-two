import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getColors(action) {
    console.log('In getSwatches');
    const userId = action.payload
    console.log(userId)
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/colors/' + userId
        })
        yield put({
            type: 'SET_COLORS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching colors', err);
    }
}
function* getColorsSaga() {
    yield takeLatest('GET_COLORS', getColors);
}

export default getColorsSaga;