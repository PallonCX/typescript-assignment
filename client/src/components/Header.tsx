import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <div className="container">
            <span className="title">Notification task</span>
            <Link to="/">
                <span className={location.pathname === "/" ? "chosenButton" : "button"}>Main</span>
            </Link>
            <Link to="/setting">
                <span className={location.pathname === "/setting" ? "chosenButton" : "button"}>Settings</span>
            </Link>
        </div>
    );
};

export default Header;
