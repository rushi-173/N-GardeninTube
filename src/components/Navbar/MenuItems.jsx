
import { Link } from "react-router-dom";

export function MenuItems(){
    return(
        <>
            <li className="menu-item">
                <b>
                    <Link to="/">Home</Link>
                </b>
            </li>
            <li className="menu-item">
                <b>
                    <Link to="/playlists" className="link-to">
                        Playlists
                    </Link>
                </b>
            </li>
            {/* <li className="menu-item">
                <Link to="/products">Fruit Plants</Link>
            </li> */}
            
            <li className="menu-item">
                <b>
                    <Link to="/playlist/history">History</Link>
                </b>
            </li>
            <li className="menu-item">
                <b>
                    <Link to="/playlist/likedVideos">Liked Videos</Link>
                </b>
            </li>
            <li className="menu-item">
                <b>
                    <Link to="/playlist/watchLaterVideos">Watch Later</Link>
                </b>
            </li>
            <li className="menu-item">
                <b>
                    <Link to="/profile">Profile</Link>
                </b>
            </li>
            <li className="menu-item">
                <b>
                    <Link to="/">Settings</Link>
                </b>
            </li>
        </>
    )
}