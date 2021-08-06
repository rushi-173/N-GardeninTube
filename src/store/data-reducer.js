import { v4 as uuid } from "uuid";

const addToPlaylist = (state, videoId, playlistId) => {
	//console.log("adding", playlistId, videoId);
	return {
		...state,
		playlists: state.playlists.map((playlistItem) => {
			return playlistItem.id === playlistId
				? {
						...playlistItem,
						videos: [...playlistItem.videos, videoId],
				  }
				: playlistItem;
		}),
	};
};

const removeFromPlaylist = (state, videoId, playlistId) => {
	//console.log("deleting", playlistId, videoId);
	return {
		...state,
		playlists: state.playlists.map((playlistItem) => {
			return playlistItem.id === playlistId
				? {
						...playlistItem,
						videos: playlistItem.videos.filter(
							(videoItem) => videoItem !== videoId
						),
				  }
				: playlistItem;
		}),
	};
};

export const reducerFunc = (state, { type, payload }) => {
	//console.log("callink", payload);

	switch (type) {
		case "INITIALIZE_VIDEOS":
			return { ...state, videos: payload };
		case "ADD_TO_VIDEOS":
			return { ...state, videos: [...state.videos, payload] };
		case "TOGGLE_IN_PLAYLISTS":
			const currentPlaylist = state.playlists.find(
				(playlistItem) => playlistItem.id === payload.playlistId
			);
			const isInPlaylist = currentPlaylist.videos.find(
				(videoItem) => videoItem === payload.videoId
			);
			return isInPlaylist
				? removeFromPlaylist(state, payload.videoId, payload.playlistId)
				: addToPlaylist(state, payload.videoId, payload.playlistId);

		case "CREATE_PLAYLIST":
			return {
				...state,
				playlists: [
					...state.playlists,
					{
						name: payload.playlistName,
						id: uuid(),
						videos: [payload.videoId],
					},
				],
			};
		case "DELETE_PLAYLIST":
			return {
				...state,
				playlists: state.playlists.filter(
					(playlistItem) => playlistItem.id !== payload.playlistId
				),
			};
		default:
			return state;
	}
};

export const initialState = {
	videos: [],
	playlists: [
		{
			name: "Liked Videos",
			id: "likedVideos",
			videos: [],
			isDefault: true,
		},
		{
			name: "Saved Videos",
			id: "savedVideo",
			videos: [],
			isDefault: true,
		},
		{
			name: "Watch Later Videos",
			id: "watchLaterVideos",
			videos: [],
			isDefault: true,
		},
		{
			name: "history",
			id: "history",
			videos: [],
			isDefault: true,
		},
	],
};

export const toggleInPlaylist = (state, payload) => {
	const currentPlaylist = state.playlists.find(
		(playlistItem) => playlistItem.id === payload.playlistId
	);
	const isInPlaylist = currentPlaylist.videos.find(
		(videoItem) => videoItem === payload.videoId
	);
	return isInPlaylist
		? removeFromPlaylist(state, payload.videoId, payload.playlistId)
		: addToPlaylist(state, payload.videoId, payload.playlistId);
};



export const createPlaylist = (state, payload) => {
	return {
		...state,
		playlists: [
			...state.playlists,
			{
				name: payload.playlistName,
				id: uuid(),
				videos: [payload.videoId],
			},
		],
	};
};

export const deletePlaylist = (state, payload) => {
	return {
		...state,
		playlists: state.playlists.filter(
			(playlistItem) => playlistItem.id !== payload.playlistId
		),
	};
};
