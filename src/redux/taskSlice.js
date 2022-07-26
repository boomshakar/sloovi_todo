import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskDataService from "../utils/task-service";

export const createTaskAsync = createAsyncThunk("task/addtask", async (data) => {
	const res = await TaskDataService.addTasks(data);
	return res.data.results;
});
export const getAllTasksAsync = createAsyncThunk("task/getAllTasks", async () => {
	const res = await TaskDataService.getAllTasks();
	return res.data.results;
});
export const deleteTasksAsync = createAsyncThunk("task/deleteTasks", async (data) => {
	const res = await TaskDataService.deleteSingleTask(data);
	return res.data.results;
});
export const getSingleTaskAsync = createAsyncThunk("task/getSingleTask", async (data) => {
	const res = await TaskDataService.getSingleTask(data);
	console.log({ res: res });
	return res.data.results;
});

const taskSlice = createSlice({
	name: "task",
	initialState: [],
	reducers: {
		addTask: (state, action) => {
			const newTask = {
				assigned_user: action.payload.assigned_user,
				task_date: action.payload.task_date,
				task_time: action.payload.task_time,
				is_completed: 0,
				time_zone: action.payload.time_zone,
				task_msg: action.payload.task_msg,
			};
			state.push(newTask);
		},
		updateTask: (state, action) => {
			const index = state.findIndex((task) => task.id === action.payload.id);
			state[index] = {
				...state[index],
				...action.payload,
			};
		},
		deleteTask: (state, action) => {
			return state.filter((task) => task.id !== action.payload.id);
		},
	},
	extraReducers: {
		[createTaskAsync.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
		[getAllTasksAsync.fulfilled]: (state, action) => {
			return action.payload;
		},
		[getSingleTaskAsync.fulfilled]: (state, action) => {
			console.log({ a: action.payload });
			return action.payload;
		},
		[deleteTasksAsync.fulfilled]: (state, action) => {
			return state.filter((task) => task.id !== action.meta.arg.id);
		},
	},
});

export default taskSlice.reducer;
