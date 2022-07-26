import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AllTask from "./pages/AllTask";
import SingleTask from "./pages/SingleTask";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<AllTask />} />
					<Route path="/:task_id" element={<SingleTask />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
