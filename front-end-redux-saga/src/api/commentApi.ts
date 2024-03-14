import { BACKEND_URL } from "../constants";


const commentApi = {
	async fetchPostComments({ postId }: { postId: number }) {
		const url = `${BACKEND_URL}/posts/${postId}/comments`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
};

export default commentApi;
