import { Link, useLocation } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
    isMain: boolean;
    onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMain , onToggle }) => {
    const location = useLocation();

    const handleClickMain = () => {
        if (!isMain) {
            onToggle();
        }
    }

    const handleClickSetting = () => {
        if (isMain) {
            onToggle();
        }
    }

    return (
        <div className="container">
            <span className="title">Notification task</span>
            <Link to="/">
                <span className={location.pathname === "/" ? "chosenButton" : "button"} onClick={handleClickMain}>Main</span>
            </Link>
            <Link to="/setting">
                <span className={location.pathname === "/setting" ? "chosenButton" : "button"} onClick={handleClickSetting}>Settings</span>
            </Link>
        </div>
    );
};

export default Header;
