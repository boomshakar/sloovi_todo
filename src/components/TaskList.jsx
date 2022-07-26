import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTasksAsync, getAllTasksAsync } from "../redux/taskSlice";

const TaskItem = ({ id, assigned_user, task_date, task_time, is_completed, time_zone, task_msg }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleDeleteFunc = () => {
		dispatch(deleteTasksAsync({ id }));
	};
	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<span>{id}</span>
			<span>{assigned_user}</span>
			<span>{task_date}</span>
			<span>{task_time}</span>
			<span>{is_completed}</span>
			<span>{time_zone}</span>
			<span>{task_msg}</span>

			<button onClick={() => {}}>EDIT</button>
			<button onClick={() => navigate(`/${id}`)}>ViEW</button>
			<button onClick={handleDeleteFunc}>DELTE</button>
		</div>
	);
};

const TaskList = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);
	useEffect(() => {
		dispatch(getAllTasksAsync());
	}, [dispatch]);
	// const users = useSelector((state) => console.log({ state }));
	// useEffect(() => {
	// 	dispatch(getUserDetailsAsync());
	// }, [dispatch]);
	// console.log({ users });

	return (
		<div>
			{tasks.map(({ id, assigned_user, task_date, task_time, is_completed, time_zone, task_msg }, ind) => (
				<TaskItem
					key={ind}
					id={id}
					assigned_user={assigned_user}
					task_date={task_date}
					task_time={task_time}
					is_completed={is_completed}
					time_zone={time_zone}
					task_msg={task_msg}
				/>
			))}
			<div></div>
			<div></div>
			{/* <div>{completedTodos.length}</div> */}
		</div>
	);
};

export default TaskList;
