import React, { useState, useEffect } from 'react';
import "./Setting.css";

interface SettingProps {
    messageCount: number;
    onMessageCountChange: (count: number) => void;
    messagePosition: number;
    onMessagePositionChange: (position: number) => void;
    messageDisappearTime: number;
    onMessageDisappearTimeChange: (position: number) => void;
}

const Setting: React.FC<SettingProps> = ({ messageCount, onMessageCountChange, messagePosition, onMessagePositionChange, messageDisappearTime, onMessageDisappearTimeChange }) => {
    const [selectedPosition, setSelectedPosition] = useState(messagePosition);

    useEffect(() => {
        setSelectedPosition(messagePosition);
    }, [messagePosition]);

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10);
        if (!isNaN(count)) {
            onMessageCountChange(count);
        } else {
            onMessageCountChange(0);
        }
    }

    const handlePositionChange = (position: number) => {
        setSelectedPosition(position);
        onMessagePositionChange(position);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10);
        if (!isNaN(count)) {
            onMessageDisappearTimeChange(count * 1000);
        } else {
            onMessageDisappearTimeChange(0);
        }
    }

    return (
        <div>
            <div className="count-block">
                <span className="description">Notification count</span>
                <input type="text" className="input" value={messageCount.toString()} onChange={handleCountChange}/>
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
                <input type="text" className="input" value={(messageDisappearTime / 1000).toString()} onChange={handleTimeChange}/>
                <span>sec</span>
            </div>
        </div>
    );
};

export default Setting;
