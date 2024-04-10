import React, { useState, useEffect } from 'react';
import { SettingState } from '../types';
import "./Setting.css";

interface SettingProps {
    settings: SettingState;
    onChangeSetting: (newSettings: Partial<SettingState>) => void;
}

const Setting: React.FC<SettingProps> = ({ settings, onChangeSetting }) => {
    const [selectedPosition, setSelectedPosition] = useState(settings.messagePosition);

    useEffect(() => {
        setSelectedPosition(settings.messagePosition);
    }, [settings.messagePosition]);

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10);
        onChangeSetting({ messageCount: !isNaN(count) ? count : 0 });
    }

    const handlePositionChange = (position: number) => {
        setSelectedPosition(position);
        onChangeSetting({ messagePosition: position });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10);
        onChangeSetting({ messageDisappearTime: !isNaN(count) ? count * 1000 : 0 });
    }

    return (
        <div>
            <div className="count-block">
                <span className="description">Notification count</span>
                <input type="text" className="input" value={settings.messageCount.toString()} onChange={handleCountChange}/>
            </div>
            <div className="position-block">
                <span className="description">Notification position</span>
                {[1, 2, 3, 4].map((position) => (
                    <span className="option" key={position}>
                        <span className="short-label">Position {position}</span>
                        <input 
                            type="radio" 
                            name="messagePosition"
                            value={position} 
                            checked={selectedPosition === position} 
                            onClick={() => handlePositionChange(position)}
                        />
                    </span>
                ))}
            </div>
            <div className="time-block">
                <span className="description">Notification disappear time</span>
                <input type="text" className="input" value={(settings.messageDisappearTime / 1000).toString()} onChange={handleTimeChange}/>
                <span>sec</span>
            </div>
        </div>
    );
};

export default Setting;
