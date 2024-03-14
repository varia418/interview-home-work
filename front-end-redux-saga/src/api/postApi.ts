import { BACKEND_URL } from "../constants";

const postApi = {
	async fetchPostBatch({
		keyword,
		batchSize,
		offset = 0,
	}: {
		keyword?: string;
		batchSize?: number;
		offset?: number;
	}) {
		let query = "";
		if (keyword) {
			query += `keyword=${keyword}`;
		}
		if (batchSize) {
			query += `&batchSize=${batchSize}&offset=${offset}`;
		}
		const url = `${BACKEND_URL}/posts${query ? `?${query}` : ""}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
	getPost(postId: number) {
		const url = `${BACKEND_URL}/posts/${postId}`;
		return fetch(url);
	},
};

export default postApi;
