import "./PlaylistVideoCard.css";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/data-context";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import { getDate } from './../../utils/getDate';

export function PlaylistVideoCard({ video, pid }) {
	const { dispatch, toggleInPlaylist, state } = useData();
	const [showModal, setShowModal] = useState("none");
	//console.log("video", video);
	const {auth} = useAuth();
	const toggleInPlaylists = async (playlistId) => {
		if(auth){
			const playlistsData = toggleInPlaylist(state,{ videoId: video.id, playlistId: playlistId })
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
					type: "TOGGLE_IN_PLAYLISTS",
					payload: { videoId: video.id, playlistId: playlistId },
				});
			} catch (err) {
				//console.log(err);
			}
		}
	};
	return (
		<div className="PlaylistVideoCard container-between">
			<div className="card-img-container">
				<Link to={`/videos/${video.id}`}>
					<img src={video.thumbnails.high.url} className="responsive-img" />
				</Link>
			</div>

			<div className="PlaylistVideoCard-description">
				<div className="description-details">
					<h3 style={{ wordBreak: "break-all" }}>
						{video.title.slice(0, 55)}...
					</h3>{" "}
					&nbsp; &nbsp;
					<button
						className="btn-details"
						onClick={() => {
							setShowModal((prev)=>prev==="none"?"flex":"none");
						}}
					>
						<i
							className="fa fa-trash"
							style={{
								color: "#b91c1c",
							}}
						></i>
					</button>
				</div>
				<div className="description-next">
					<p>{video.channelInfo.title}</p>
					<p>{video.statistics.likeCount} likes . getDate(video.publishedAt)</p>
				</div>
			</div>
			<div
				className="modal"
				id="modal"
				style={{ display: showModal }}
			>
                <div className="modal-content">
					<div className="modal-title">
						<h2>Delete from Playlist</h2>

					</div>
					<div className="modal-description">
						<p>Do you really want to delete this item</p>
						
					</div>
					<div className="modal-btn-container">
						<button className="btn btn-primary" onClick={() => {
							setShowModal((prev)=>prev==="none"?"flex":"none");
						}}>Close</button>
						<button className="btn btn-danger" onClick={() => {
							toggleInPlaylists(pid);
							setShowModal((prev)=>prev==="none"?"flex":"none")
						}}>Delete</button>

					</div>                    
                </div>
            </div>
		</div>
	);
}

export default PlaylistVideoCard;
