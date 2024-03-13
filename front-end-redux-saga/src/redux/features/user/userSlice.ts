import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { User } from "../../../types";

type UserState = User[];

const initialState: UserState = [];

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		fetchUsersSucceeded: (state, action) => {
			const projectedUserData: User[] = action.payload.map(
				(user: any): User => ({
					id: user.id,
					username: user.username,
				})
			);
			return projectedUserData;
		},
	},
});

export const { fetchUsersSucceeded } = userSlice.actions;
export const selectUsername = (state: RootState, userId: number) =>
	state.user.find((user: User) => user?.id === userId)?.username ?? "";
export default userSlice.reducer;
