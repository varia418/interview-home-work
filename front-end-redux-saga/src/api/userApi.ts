const userApi = {
	async fetchUsers() {
		const baseUrl = process.env.REACT_APP_BACKEND_URL;
		const url = `${baseUrl}/users`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
};

export default userApi;
