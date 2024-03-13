const commentApi = {
	async fetchPostComments({ postId }: { postId: number }) {
		const baseUrl = process.env.REACT_APP_BACKEND_URL;
		const url = `${baseUrl}/posts/${postId}/comments`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
	// getPost(id) {
	// 	const url = `/posts/${id}`;
	// 	return fetch(url);
	// },
};

export default commentApi;
