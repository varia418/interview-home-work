import { BACKEND_URL } from "../constants";

const userApi = {
	async fetchUsers() {
		const url = `${BACKEND_URL}/users`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
};

export default userApi;
