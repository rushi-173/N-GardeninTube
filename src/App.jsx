import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { Home, VideoDetails, Playlist, Playlists, Login, Signup , Profile, PageNotFound} from "./pages";
import axios from "axios";
import { useData } from "./contexts/data-context";
import { useEffect } from "react";
import { useAuth } from "./contexts/auth-context";

function App() {
	const { videos, dispatch } = useData();
	const loadVideos = async () => {
		try {
			const response = await axios.get(
				"https://VideoLibBack-1.rushi173.repl.co/video"
			);
			console.log();
			dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data.data });
		} catch (error) {
			console.log(error);
		}
	};
	const { auth } = useAuth();

  const PrivateRoute = ({ path, element, children }) => {
		if (auth) {
			return element || children;
		} else {
			return <Navigate to="/login" state={{ from: path }} />;
		}
	};
	useEffect(() => {
		!videos.length && loadVideos();
	}, []);

	return (
		<div className="App">
			<Navbar />
			<div className="main-window">
				<Sidebar />
				<div className="main-window-container">
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/videos/:id" element={<VideoDetails />} />
						<PrivateRoute exact path="/playlist/:id" element={<Playlist />} />
						<Route exact path="/videos" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/signup" element={<Signup />} />
						
						<PrivateRoute exact path="/profile" element={<Profile/>} />
						<PrivateRoute exact path="/playlist" element={<Playlists />} />
						<PrivateRoute exact path="/playlists" element={<Playlists />} />
						
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
