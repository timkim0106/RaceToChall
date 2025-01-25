import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
//import "./App.css";
import HomePage from './components/HomePage.jsx';


/*import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HomePage from './components/HomePage';

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ContestPage from './components/CalendarView';
import ProfilePage from './components/TodoListView';
import 'bootstrap/dist/css/bootstrap.min.css';

*/

/*
This is the starting point of our application. Here, we can begin coding 
and transforming this page into whatever best suits our needs. 
For example, we can start by creating a login page, home page, or an about section; 
there are many ways to get your application up and running. 
With App.jsx, we can also define global variables and routes to store information as well as page navigation.
*/
function App() {
	const [count, setCount] = useState(0);
	const [randomItem, setRandomItem] = useState(null);

	async function getRandomItem() {
		/*
		Because of the server proxy we set up in our Vite config, there's no
		more need to specify localhost for the backend! Just use `/api/path`.

		We query the backend and store its response into a state variable,
		where we display it in our JSX below.
		*/

		const res = await fetch(`/api/get-random`);
		const data = await res.json();
		setRandomItem(data["item_id"]);
	}

	useEffect(() => {
		getRandomItem();
	}, []);

	return (
		
		<div>
			<HomePage />
		</div>
		
	);
}

export default App;
