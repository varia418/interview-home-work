import { combineReducers } from "@reduxjs/toolkit";

import postReducer from "./features/post/postSlice";
import userReducer from "./features/user/userSlice";

const rootReducer = combineReducers({
	post: postReducer,
	user: userReducer,
});

export default rootReducer;
