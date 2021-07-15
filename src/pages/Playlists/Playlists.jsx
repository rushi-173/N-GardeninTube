import { PlaylistOverviewCard } from "../../components";
import "./Playlists.css";
import { useData } from "../../contexts/data-context";

export function Playlists() {
	const { playlists } = useData();

	return (
		<div className="Playlists container-column">
			<div className="top-submenu"></div>
			<div className="Videos-Container">
				{playlists.map((playlist) => {
                    if(playlist.id!=="history"){
					return <PlaylistOverviewCard playlist={playlist} />;
                    }
                    return null;
				})}
			</div>
		</div>
	);
}
