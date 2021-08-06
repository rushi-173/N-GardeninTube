import {
	createContext,
	useContext,
	useState,
	useEffect,
	useReducer,
} from "react";

import { initialState, reducerFunc, toggleInPlaylist, deletePlaylist, createPlaylist } from "../store/data-reducer";

const DataContext = createContext();

export function DataProvider({ children }) {
	const [state, dispatch] = useReducer(reducerFunc, initialState);
	


	return (
		<DataContext.Provider value={{ videos: state.videos, dispatch,state: state, playlists: state.playlists,  toggleInPlaylist, deletePlaylist, createPlaylist }}>
			{children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext(DataContext);
