import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { DataProvider } from "./contexts/data-context";
import { AuthProvider } from "./contexts/auth-context";
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
			<DataProvider>
				<ToastProvider autoDismiss
    autoDismissTimeout={3000}
    placement="bottom-left">
				<App />
				</ToastProvider>
			</DataProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

