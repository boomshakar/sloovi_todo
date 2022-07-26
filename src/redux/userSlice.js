import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskDataService from "../utils/task-service";

export const getUserDetailsAsync = createAsyncThunk("user/getAllTasks", async (data) => {
	const res = await TaskDataService.getUserDetails();
	// console.log({ res: res.data.results.data });
	return res.data.results.data;
});

const userSlice = createSlice({
	name: "user",
	initialState: [],
	extraReducers: {
		[getUserDetailsAsync.fulfilled]: (state, action) => {
			// console.log({ a: action.payload });
			return action.payload;
		},
	},
});

export default userSlice.reducer;
