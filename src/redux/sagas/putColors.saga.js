import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* putColors(action) {
    console.log('In putColors');
    const userId = action.payload.userId;
    const id = action.payload.id;
    try {
        const response = yield axios({
            method: 'PUT',
            url: '/api/colors/put',
            data: {
                id,
            }
        })
        yield put({
            type: 'GET_COLORS',
            payload: userId
        });
    } catch(err) {
        console.log('Error marking color as deleted', err);
    }
}
function* putColorsSaga() {
    yield takeLatest('PUT_COLORS', putColors);
}

export default putColorsSaga;