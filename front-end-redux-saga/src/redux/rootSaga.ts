import { all } from 'redux-saga/effects';

import postSaga from './features/post/postSaga';

function* rootSaga() {
    yield all([postSaga()]);
}

export default rootSaga;