import { call, put, takeEvery } from "redux-saga/effects";
import postApi from "../../../api/postApi";
import {
	fetchPostBatchSucceeded,
	fetchPostCommentsSucceeded,
	fetchPostsRequested,
} from "./postSlice";
import commentApi from "../../../api/commentApi";

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
		yield put(fetchPostsRequested);
		const { keyword, batchSize, offset } = action.payload;
		const data = yield call(postApi.fetchPostBatch, {
			keyword,
			batchSize,
			offset,
		});
		data.offset = offset;
		yield put(fetchPostBatchSucceeded(data));
	} catch (error) {
		console.log("🚀 ~ error:", error);
		// yield put({ type: "USER_FETCH_FAILED", message: error?.message });
	}
}

interface FetchPostCommentsAction {
	type: string;
	payload: {
		postId: number;
	};
}

function* fetchPostComments(
	action: FetchPostCommentsAction
): Generator<any, void, any> {
	try {
		const { postId } = action.payload;
		const data = yield call(commentApi.fetchPostComments, { postId });
		const payload = {
			data,
			postId,
		};
		yield put(fetchPostCommentsSucceeded(payload));
	} catch (error) {
		console.log("🚀 ~ error:", error);
	}
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* postSaga() {
	yield takeEvery("POST_FETCH_REQUESTED", fetchPostBatch);
	yield takeEvery("COMMENT_FETCH_REQUESTED", fetchPostComments);
}
