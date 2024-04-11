import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <div className="container">
            <div className="titleAndButtons">
                <div className="titleAndTabs">
                    <span className="title">Notification task</span>
                    <span className="tabs">
                        <Link to="/" className={location.pathname === "/" ? "chosenTab" : "mainTab"}>
                            <span className={location.pathname === "/" ? "chosenButton" : "button"} id="mainButton">Main</span>
                        </Link>
                        <Link to="/setting" className={location.pathname === "/setting" ? "chosenTab" : "mainTab"}>
                            <span className={location.pathname === "/setting" ? "chosenButton" : "button"} id="settingButton">Settings</span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
