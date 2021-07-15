import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { DataProvider } from "./contexts/data-context";
import { AuthProvider } from "./contexts/auth-context";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
			<DataProvider>
				<App />
			</DataProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

