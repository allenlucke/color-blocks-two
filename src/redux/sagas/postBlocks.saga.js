import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postBlocks(action) {
    console.log('In postBlocks');
    const userId = action.payload.userId;
    const colorsId = action.payload.colorsId;
    const achievementsId = action.payload.achievementsId;
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/blocksPost',
            data: {
                userId,
                colorsId,
                achievementsId,
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