import "./Sidebar.css";
import {SidebarItem} from "./SidebarItem";

export function Sidebar() {
	return (
		<div className="container-column sidebar">
			<SidebarItem path="/">
				<i className="fa fa-home" aria-hidden="true"></i>
				<small>Home</small>
			</SidebarItem>
			<SidebarItem path="/playlists">
				<i className="fa fa-indent" aria-hidden="true"></i>
				<small>Playlists</small>
			</SidebarItem>
			<SidebarItem path="/playlist/history">
				<i className="fa fa-history" aria-hidden="true"></i>
				<small>History</small>
			</SidebarItem>
			<SidebarItem path="/playlist/likedVideos">
				<i className="fa fa-thumbs-up" aria-hidden="true"></i>
				<small>Liked_Videos</small>
			</SidebarItem>
			<SidebarItem path="/playlist/watchLaterVideos">
				<i className="fa fa-clock-o" aria-hidden="true"></i>
				<small>Watch_Later</small>
			</SidebarItem>
		</div>
	);
}

export default Sidebar;
