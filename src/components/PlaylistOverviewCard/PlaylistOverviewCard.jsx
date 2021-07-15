import { Link } from "react-router-dom";
import { useData } from "../../contexts/data-context";
import { VideoMiniCard } from "../VideoMiniCard/VideoMiniCard";
import "./PlaylistOverviewCard.css";

export function PlaylistOverviewCard({ playlist }){
  const {videos} = useData();
  let playlistVideos = []
    playlistVideos = playlist.videos.map((vid)=>{
        return videos.find((video) => video.id === vid);;
    })
  return (
    <div className="PlaylistOverviewCard container-column">
      <div className="poc-header">
        <div className="poc-details">
          <h2>{playlist.name}</h2>
          {playlist.videos.length !== 0 && (
            <p>
              {playlist.videos.length} videos
            </p>
          )}
        </div>
        <Link
          to={`/playlist/${playlist.id}`}
        >
          <i class="fa fa-external-link" aria-hidden="true"></i>
        </Link>
      </div>
      <div className="poc-videos-container">
        {playlist.videos.length !== 0 ? (
          playlistVideos
            .slice(0, 5)
            .map((video) => <VideoMiniCard video={video} />)
        ) : (
          <div
            className=""
          >
            <h4>No videos in this playlist</h4>
          </div>
        )}
      </div>
    </div>
  );
};

