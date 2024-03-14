import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PostData } from "../../../types";

const postAdapter = createEntityAdapter<PostData>({
	selectId: (post: PostData) => post.id,
});

const initialState = postAdapter.getInitialState({
	hasNext: true,
	isLoading: false,
});

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
				postAdapter.setAll(state, data);
			} else {
				postAdapter.upsertMany(state, data);
			}
			state.hasNext = hasNext;
		},
		fetchPostCommentsSucceeded: (state, action) => {
			const { postId, data } = action.payload;
			const post = state.entities[postId];
			if (post) {
				post.comments = data;
			}
		},
		pageChanged: (state, action) => {
			postAdapter.setAll(state, []);
			state.hasNext = true;
		},
		fetchPostDetailsSucceeded: (state, action) => {
			const { data } = action.payload;
			postAdapter.upsertOne(state, data);
		},
	},
});

export const {
	fetchPostBatchSucceeded,
	fetchPostCommentsSucceeded,
	fetchPostsRequested,
	pageChanged,
} = postSlice.actions;

export const { selectAll: selectPosts, selectById: selectPostDetails } =
	postAdapter.getSelectors((state: RootState) => state.post);
export const selectPostMetadata = (state: RootState) => ({
	isLoading: state.post.isLoading,
	hasNext: state.post.hasNext,
});

export default postSlice.reducer;
