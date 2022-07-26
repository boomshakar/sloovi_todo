import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, COMPANY_ID } from "../utils/helper";
import { addTask, createTaskAsync } from "../redux/taskSlice";
import { getUserDetailsAsync } from "../redux/userSlice";

const TaskForm = ({ isEditting, editData }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);

	const getTimeZoneOffsetInSeconds = (date) => {
		return -date.getTimezoneOffset() * 60;
	};
	const convertTimeToSeconds = (time) => {
		const timeSPlit = time.split(":");
		const hh = Number(timeSPlit[0]) * 3600;
		const mm = Number(timeSPlit[1]) * 60;
		let seconds = hh + mm;
		return seconds;
	};
	const getCurrDate = new Date();
	// const timezoneSecondsz = getTimeZoneOffsetInSeconds(getCurrDate);
	// convertTimeToSeconds("01:30");

	const users = useSelector((state) => state.users);
	useEffect(() => {
		dispatch(getUserDetailsAsync());
	}, [dispatch]);

	const handleFormSubmission = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		const { task_msg, task_date, task_time, assigned_user } = formProps;
		// console.log({ formProps });
		const newTask_time = convertTimeToSeconds(task_time);
		// console.log({ newTask_time });
		// return;
		dispatch(
			createTaskAsync({
				task_msg,
				assigned_user,
				task_date,
				task_time: newTask_time,
				is_completed: 0,
				time_zone: getTimeZoneOffsetInSeconds(getCurrDate),
			})
		);
		e.target.reset();
	};
	return (
		<div>
			<div className="taskform_container">
				<div className="task_head">
					<div>
						TASKS <span>{tasks.length}</span>
					</div>
					<div>
						<span>+</span>
					</div>
				</div>
				<div className="task_body">
					<form onSubmit={handleFormSubmission}>
						<div className="form_label_wrapper">
							<label htmlFor="task_desc">Task Description</label>
							<input required type="text" id="task_desc" name="task_msg" />
						</div>
						<div className="form_row">
							<div className="form_label_wrapper">
								<label htmlFor="task_date">Date</label>
								<input
									required
									type="date"
									id="task_date"
									onFocus={(e) => {
										e.currentTarget.type = "date";
									}}
									onBlur={(e) => {
										e.currentTarget.type = "text";
										// e.currentTarget.placeholder = "tessxt";
									}}
									placeholder="04/26/2021"
									name="task_date"
								/>
							</div>
							<div className="form_label_wrapper">
								<label htmlFor="task_time">Time</label>
								<input
									required
									type="time"
									id="task_time"
									onFocus={(e) => {
										e.currentTarget.type = "time";
									}}
									onBlur={(e) => {
										e.currentTarget.type = "text";
									}}
									placeholder="Time"
									name="task_time"
								/>
							</div>
						</div>
						<div className="form_label_wrapper">
							<label htmlFor="user_id">Assign User</label>
							<select required name="assigned_user" id="user_id" placeholder="Select user">
								<option value="" disabled>
									Select user
								</option>
								{users.map((user) => (
									<option key={user.id} value={user.id}>
										{user.name}
									</option>
								))}
							</select>
						</div>
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TaskForm;
