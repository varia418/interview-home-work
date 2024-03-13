import { all } from "redux-saga/effects";

import postSaga from "./features/post/postSaga";
import userSaga from "./features/user/userSaga";

function* rootSaga() {
	yield all([postSaga(), userSaga()]);
}

export default rootSaga;
