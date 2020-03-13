import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* putColors(action) {
    console.log('In putColors');
    const userId = action.payload.userId;
    const colors_userId = action.payload.colors_userId;
    try {
        const response = yield axios({
            method: 'PUT',
            url: '/api/colors/put',
            data: {
                colors_userId,
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