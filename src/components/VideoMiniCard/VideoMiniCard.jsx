import "./VideoMiniCard.css";
import {Link} from "react-router-dom";

export function VideoMiniCard({ video }) {
	//console.log("video", video);
	return (
		<div className="VideoMiniCard ">
			<div className="card-img-container">
            <Link to={`/videos/${video.id}`}>
				<img src={video.thumbnails.high.url} className="responsive-img" />
                
            </Link>
			</div>
			<div className="VideoMiniCard-description">
				<div className="description-details">
					<h3 style={{ wordBreak: "break-all" }}>
						{video.title.slice(0, 55)}...
					</h3>
				</div>
				<div className="description-next">
					<p>{video.channelInfo.title}</p>
				</div>
			</div>
		</div>
	);
}

