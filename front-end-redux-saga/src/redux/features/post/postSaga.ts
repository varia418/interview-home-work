import { call, put, takeEvery } from "redux-saga/effects";
import postApi from "../../../api/postApi";
import { fetchPostBatchSucceeded } from "./postSlice";

interface FetchPostBatchAction {
	type: string;
	payload: {
		keyword?: string;
		batchSize?: number;
		offset?: number;
	};
}

function* fetchPostBatch(
	action: FetchPostBatchAction
): Generator<any, void, any> {
	try {
		const { keyword, batchSize, offset } = action.payload;
		const data = yield call(postApi.fetchPostBatch, {
			keyword,
			batchSize,
			offset,
		});
		yield put(fetchPostBatchSucceeded(data));
	} catch (error) {
		console.log("🚀 ~ error:", error);
		// yield put({ type: "USER_FETCH_FAILED", message: error?.message });
	}
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* postSaga() {
	yield takeEvery("POST_FETCH_REQUESTED", fetchPostBatch);
}
