import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	hasNext: true,
	posts: [
		{
			_id: "6572a2fbc43b6b61d2adccca",
			userId: 1,
			id: 1,
			title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
		},
		{
			_id: "6572a2fbc43b6b61d2adcccb",
			userId: 1,
			id: 2,
			title: "qui est esse",
			body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
		},
		{
			_id: "6572a2fbc43b6b61d2adcccc",
			userId: 1,
			id: 3,
			title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
			body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
		},
		{
			_id: "6572a2fbc43b6b61d2adcccd",
			userId: 1,
			id: 4,
			title: "eum et est occaecati",
			body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit",
		},
		{
			_id: "6572a2fbc43b6b61d2adccce",
			userId: 1,
			id: 5,
			title: "nesciunt quas odio",
			body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque",
		},
	],
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
export default postsSlice.reducer;
