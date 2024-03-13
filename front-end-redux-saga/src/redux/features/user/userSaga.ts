import { call, put, takeEvery } from "redux-saga/effects";
import userApi from "../../../api/userApi";
import { fetchUsersSucceeded } from "./userSlice";

function* fetchUsers(): Generator<any, void, any> {
	try {
		const data = yield call(userApi.fetchUsers);
		yield put(fetchUsersSucceeded(data));
	} catch (error) {
		console.log("🚀 ~ error:", error);
	}
}

export default function* userSaga() {
	yield takeEvery("USERS_FETCH_REQUESTED", fetchUsers);
}
