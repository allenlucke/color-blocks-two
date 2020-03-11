import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postBlocks(action) {
    console.log('In postBlocks');
    const userId = action.payload.userId;
    const colorsId= action.payload.colorsId;
    // console.log(action.payload.userId);
    // console.log(userId);
    // console.log(colorsId);
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/blocks/post',
            data: {
                userId,
                colorsId
            }
        })
        yield put({
            type: 'GET_BLOCKS',
            payload: userId
        });
    } catch(err) {
        console.log('Error fetching color blocks', err);
    }
}
function* postBlocksSaga() {
    yield takeLatest('ADD_BLOCKS', postBlocks);
}

export default postBlocksSaga;