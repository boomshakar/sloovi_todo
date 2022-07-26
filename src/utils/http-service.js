import axios from "axios";
import { BASE_URL, BEARER_TOKEN } from "./helper";
export default axios.create({
	baseURL: `${BASE_URL}`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `${BEARER_TOKEN}`,
	},
});
