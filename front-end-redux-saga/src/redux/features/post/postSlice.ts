import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PostData } from "../../../types";

interface PostState {
	hasNext: boolean;
	isLoading: boolean;
	posts: PostData[];
}

const initialState: PostState = {
	hasNext: true,
	isLoading: false,
	posts: [],
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		fetchPostsRequested: (state) => {
			state.isLoading = true;
		},
		fetchPostBatchSucceeded: (state, action) => {
			state.isLoading = false;
			const { offset, data, hasNext } = action.payload;
			if (offset === 0) {
				state.posts = data;
			} else {
				state.posts = [...state.posts, ...data];
			}
			state.hasNext = hasNext;
		},
		fetchPostCommentsSucceeded: (state, action) => {
			const { postId, data } = action.payload;
			const post = state.posts.find((post) => post.id === postId);
			if (post) {
				post.comments = data;
			}
		},
		pageChanged: (state, action) => {
			state.posts = [];
            state.hasNext = true;
		},
	},
});

export const {
	fetchPostBatchSucceeded,
	fetchPostCommentsSucceeded,
	fetchPostsRequested,
	pageChanged,
} = postSlice.actions;
export const selectPosts = (state: RootState) => state.post;
export default postSlice.reducer;
