import "./Header.css";

interface HeaderProps {
    isMain: boolean;
    onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMain , onToggle }) => {

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
            <span className={isMain?"chosenButton":"button"} onClick={handleClickMain}>Main</span>
            <span className={!isMain?"chosenButton":"button"} onClick={handleClickSetting}>Settings</span>
        </div>
    );
};

export default Header;
