import { VideoCard } from "../../components";
import "./Home.css";
import { useData } from "../../contexts/data-context";

export function Home() {
	const { videos } = useData();

	console.log(videos);
	return (
		<div className="Home container-column">
			<div className="top-submenu"></div>
			<div className="Videos-Container">
				{videos.map((video) => {
					return <VideoCard video={video} key={video.id} />;
				})}
			</div>
		</div>
	);
}
