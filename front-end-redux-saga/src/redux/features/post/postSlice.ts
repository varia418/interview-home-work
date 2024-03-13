import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PostData } from "../../../types";

interface PostState {
	hasNext: boolean;
	posts: PostData[];
}

const initialState: PostState = {
	hasNext: true,
	posts: [],
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		fetchPostBatchSucceeded: (state, action) => {
			state.posts = [...state.posts, ...action.payload.data];
			state.hasNext = action.payload.hasNext;
		},
	},
});

export const { fetchPostBatchSucceeded } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.post;
export default postsSlice.reducer;
