import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* searchColors(action) {
    console.log('In searchColors');
    const label = action.payload
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/colorsSearch/' + label
        })
        yield put({
            type: 'SET_SEARCHED_COLORS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching colors', err);
    }
}
function* searchColorsSaga() {
    yield takeLatest('SEARCH_COLORS', searchColors);
}

export default searchColorsSaga;