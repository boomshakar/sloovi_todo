import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getSingleTaskAsync } from "../redux/taskSlice";

const SingleTask = () => {
	const [isEditting, setIsEditting] = useState(false);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const tasks = useSelector((state) => state.tasks);
	console.log({ tasks });
	useEffect(() => {
		dispatch(getSingleTaskAsync(params.task_id));
	}, [dispatch]);
	return (
		<div>
			<img src={tasks?.assigned_user_icon} alt="" width={100} />
			<div>Assigned User: {tasks?.assigned_user}</div>
			<div>Assigned User Name: {tasks?.assigned_user_name}</div>
			<div>Task Description : {tasks?.task_msg}</div>
			<div>Task Completed: {tasks?.is_completed <= 0 ? "false" : "true"}</div>
			<div>Date Created: {tasks?.task_date}</div>

			<div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
				<button onClick={() => setIsEditting(true)}>EDIT</button>
			</div>
		</div>
	);
};

export default SingleTask;
