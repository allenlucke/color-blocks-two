import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPoints(action) {
    console.log('In getPoints');
    const userId = action.payload
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/points/' + userId
        })
        yield put({
            type: 'SET_POINTS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching points', err);
    }
}
function* getPointsSaga() {
    yield takeLatest('GET_POINTS', getPoints);
}

export default getPointsSaga;