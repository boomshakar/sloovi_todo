import { COMPANY_ID } from "./helper";
import http from "./http-service";

class TaskDataService {
	addTasks(data) {
		return http.post(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${COMPANY_ID}`, data);
	}
	getUserDetails() {
		return http.get(`/team?product=outreach&company_id=${COMPANY_ID}`);
	}
	getAllTasks() {
		return http.get(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${COMPANY_ID}`);
	}
	getSingleTask(id) {
		return http.get(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${COMPANY_ID}`);
	}
	updateSingleTask(id, data) {
		return http.put(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${COMPANY_ID}`, data);
	}
	deleteSingleTask({ id }) {
		return http.delete(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${COMPANY_ID}`);
	}
}

export default new TaskDataService();
