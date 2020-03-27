import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getColorsSaga from './getColors.saga';
import getBlocksSaga from './getBlocks.saga';
import postBlocksSaga from './postBlocks.saga';
import postColorsSaga from './postColors.saga';
import putBlocksSaga from './putBlocks.saga';
import putColorsSaga from './putColors.saga';
import getPointsSaga from './getPoints.saga';
import searchColorsSaga from './searchColors.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getColorsSaga(),
    getBlocksSaga(),
    postBlocksSaga(),
    postColorsSaga(),
    putBlocksSaga(),
    putColorsSaga(),
    getPointsSaga(),
    searchColorsSaga(),
  ]);
}
