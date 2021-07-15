import "./VideoDetails.css";
import { useData } from "../../contexts/data-context";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import { VideoCard } from "../../components";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

export function VideoDetails() {
	const { videos, dispatch, playlists, toggleInPlaylist, state } = useData();

	const [currentPlaylistInput, setCurrentPlaylistInput] = useState("");
	const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

	let { id } = useParams();
	console.log(videos);
	let video = videos.find((video) => video.id === id);
	if (!video) {
		video = { title: "", description: "" };
	}
	console.log(id, video);
	// const id = "jD8n2CKEWtA";
	const url = `https://www.youtube.com/watch?v=${id}`;
	const { auth } = useAuth();

	const toggleInPlaylists = async (playlistId) => {
		if(auth){
		const playlistsData = toggleInPlaylist(state,{ videoId: id, playlistId: playlistId })
		try {
			const res = await axios.post(
				"https://VideoLibBack-1.rushi173.repl.co/playlist",
				{
					playlists: playlistsData.playlists
				},
				{
					headers: {
						Token: auth.token,
					},
				}
			);
			console.log("data ",res)

			dispatch({
				type: "TOGGLE_IN_PLAYLISTS",
				payload: { videoId: id, playlistId: playlistId },
			});
		} catch (err) {
			console.log(err);
		}
	}
		
	};
	console.log(playlists);
	const togglePlaylistMenu = () => {
		setShowPlaylistMenu((prev) => (prev === true ? false : true));
		console.log("calling tog 2");
	};
	console.log(showPlaylistMenu);

	const getPlaylistById = (id) =>
		playlists.filter((playlistItem) => playlistItem.id === id)?.[0];

	const getPlaylistByName = (name) =>
		playlists.filter((playlistItem) => playlistItem.name === name)?.[0];

	const isInPlaylists = (playlistId, videoId) => {
		const playlist = getPlaylistById(playlistId);
		return playlist?.videos.find((videoItem) => videoItem === video.id);
	};

	const createPlaylist = async (e) => {
		e.preventDefault();
		setCurrentPlaylistInput("");
		if(currentPlaylistInput && !getPlaylistByName(currentPlaylistInput) ){
			if(auth){
				const playlistsData = createPlaylist(state,{ playlistName: currentPlaylistInput, videoId: video.id })
				try {
					const res = await axios.post(
						"https://VideoLibBack-1.rushi173.repl.co/playlist",
						{
							playlists: playlistsData.playlists
						},
						{
							headers: {
								Token: auth.token,
							},
						}
					);
		
					dispatch({
						type: "CREATE_PLAYLIST",
						payload: { playlistName: currentPlaylistInput, videoId: video.id },
					});
				} catch (err) {
					console.log(err);
				}
			}
			
		}
	};

	// useEffect(() => {
		// if (!isInPlaylists("history", id)) {
		// 	toggleInPlaylists("history");
		// }
		
	// }, [id]);
	// console.log(playlists);

	return (
		<div className="VideoDetails">
			<div className=" v-details-container container-column">
				<div
					className="wrapper"
					// style={{ position: "relative", paddingTop: "56.25%" }}
				>
					<ReactPlayer
						// style={{ position: "absolute", top: "0", left: "0" }}
						url={url}
						width="100%"
						height="100%"
						autoplay={true}
						stopOnUnmount={false}
						config={{ youtube: { playerVars: { controls: 1, loop: 1 } } }}
					/>
				</div>
				<div
					className="v-details-container"
					style={{ backgroundColor: "white" }}
				>
					<h3>{video.title}</h3>
					<div className="reaction-bar">
						<div
							className="avatar-badge-container reaction-bar-item"
							role="button"
						>
							<div
								className="avatar-noborder container-center"
								style={{ width: "2rem", height: "2rem" }}
							>
								<img
									src={video.channelInfo?.thumbnails.default.url}
									alt="thumb-new"
									class="avatar-img"
								/>
							</div>
						</div>
						<div className="container-column" role="button">
							<h5>{video.channelInfo?.title}</h5>
						</div>
						<div
							className="avatar-badge-container reaction-bar-item"
							role="button"
						>
							<div
								className="avatar-noborder container-center"
								onClick={() => {
									toggleInPlaylists("likedVideos");
								}}
							>
								<i
									className="fa fa-thumbs-up"
									role="button"
									style={{
										color: isInPlaylists("likedVideos", id)
											? "#51c84d"
											: "#1f2937",
									}}
								></i>
								<br />
								<small>{video.statistics?.likeCount}likes</small>
							</div>
						</div>
						<div
							className="avatar-badge-container reaction-bar-item"
							role="button"
						>
							<div
								className="avatar-noborder container-center"
								onClick={() => {
									toggleInPlaylists("watchLaterVideos");
								}}
							>
								<i
									className="fa fa-clock-o"
									role="button"
									style={{
										color: isInPlaylists("watchLaterVideos", id)
											? "#51c84d"
											: "#1f2937",
									}}
								></i>
								<br />
								<small>Watch_Later</small>
							</div>
						</div>
						<div
							className="avatar-badge-container reaction-bar-item"
							role="button"
						>
							{showPlaylistMenu && (
								<div className="playlist-menu">
									<ul>
										<li>
											<h1>Save to-</h1>
										</li>
										{playlists &&
											playlists.map((playlistItem) => {
												if (playlistItem.id !== "history") {
													return (
														<li className="playlist-menu-item">
															<input
																checked={isInPlaylists(playlistItem.id)}
																type="checkbox"
																onChange={() =>
																	toggleInPlaylists(playlistItem.id)
																}
																className="check"
															/>
															<span>{playlistItem.name}</span>
														</li>
													);
												}
												return null;
											})}
										<li className="container-center">
											<form
												onSubmit={(e) => createPlaylist(e)}
												className="playlist-form"
											>
												<input
													className="playlist-input"
													value={currentPlaylistInput}
													onChange={(e) =>
														setCurrentPlaylistInput(() => e.target.value)
													}
													type="search"
												/>
												<button className="btn btn-primary btn-add-playlist">
													<i
														className="fa fa-plus-square add-play-icon"
														aria-hidden="true"
														style={{ color: "white" }}
													></i>
												</button>
											</form>
										</li>
										<li>
											<button
												onClick={togglePlaylistMenu}
												className="badge block btn-close"
												style={{ position: "absolute", top: "0", right: "0" }}
											>
												<i
													class="fa fa-window-close"
													style={{ color: "#b91c1c" }}
												></i>
											</button>
										</li>
									</ul>
								</div>
							)}
							<div
								className="avatar-noborder container-center"
								onClick={togglePlaylistMenu}
							>
								<i
									className="fa fa-plus-square"
									aria-hidden="true"
									style={{ color: showPlaylistMenu ? "#51c84d" : "#1f2937" }}
								></i>
								<br />
								<small>Add To</small>
							</div>
						</div>
					</div>
				</div>
				<div className="v-description-container">{video.description}</div>
			</div>

			<div className="v-suggestion-container">
				{videos.map((video) => {
					return <VideoCard video={video} />;
				})}
			</div>
		</div>
	);
}

