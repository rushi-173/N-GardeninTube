import { PlaylistVideoCard } from "../../components";
import "./Playlist.css";
import { useData } from "../../contexts/data-context";
import { useParams } from "react-router-dom";

export function Playlist() {
	const { playlists, videos } = useData();
    let { id } = useParams();
	const playlist = playlists.find((playlist) => playlist.id === id);
    //console.log("done ", playlist, id, playlists)
    let playlistVideos = []
    playlistVideos = playlist.videos.map((vid)=>{
        return videos.find((video) => video.id === vid);;
    })
    //console.log("line15", playlistVideos);
	return (
		<div className="Playlist container-column">
            <div className="playlist-name-container">
                <center><h2>{playlist.name}</h2></center>
            </div>
			<div className="Videos-Container">
				{playlistVideos.reverse().map((video) => {
					return <PlaylistVideoCard video={video} pid={id} />;
				})}
			</div>
		</div>
	);
}

