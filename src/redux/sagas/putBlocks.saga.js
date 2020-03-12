import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* putBlocks(action) {
    console.log('In putBlocks');
    const userId = action.payload.userId;
    const id = action.payload.id;
    try {
        const response = yield axios({
            method: 'PUT',
            url: '/api/blocks/put',
            data: {
                id,
            }
        })
        yield put({
            type: 'GET_BLOCKS',
            payload: userId
        });
    } catch(err) {
        console.log('Error marking block as deleted', err);
    }
}
function* putBlocksSaga() {
    yield takeLatest('PUT_BLOCKS', putBlocks);
}

export default putBlocksSaga;