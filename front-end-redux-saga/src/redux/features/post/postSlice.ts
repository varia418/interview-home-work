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

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		fetchPostBatchSucceeded: (state, action) => {
			state.posts = [...state.posts, ...action.payload.data];
			state.hasNext = action.payload.hasNext;
		},
		fetchPostCommentsSucceeded: (state, action) => {
			const { postId, data } = action.payload;
			const post = state.posts.find((post) => post.id === postId);
			if (post) {
				post.comments = data;
			}
		},
	},
});

export const { fetchPostBatchSucceeded, fetchPostCommentsSucceeded } = postSlice.actions;
export const selectPosts = (state: RootState) => state.post;
export default postSlice.reducer;
