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
		const baseUrl = process.env.REACT_APP_BACKEND_URL;
		let query = "";
		if (keyword) {
			query += `keyword=${keyword}`;
		}
		if (batchSize) {
			query += `&batchSize=${batchSize}&offset=${offset}`;
		}
		const url = `${baseUrl}/posts${query ? `?${query}` : ""}`;
		const response = await fetch(url);
        const data = await response.json();
		return data;
	},
	// getPost(id) {
	// 	const url = `/posts/${id}`;
	// 	return fetch(url);
	// },
};

export default postApi;
