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
    const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

    useEffect(() => {
        const newCheckboxes = checkboxes.map((checkbox, i) => i === messagePosition - 1);
        setCheckboxes(newCheckboxes);
    }, [messagePosition])

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10);
        if (!isNaN(count)) {
            onMessageCountChange(count);
        } else {
            onMessageCountChange(0);
        }
    }

    const handleCheckboxChange = (index: number) => {
        const newCheckboxes = checkboxes.map((checkbox, i) => i === index);
        setCheckboxes(newCheckboxes);
        onMessagePositionChange(index + 1);
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
                {checkboxes.map((checkbox, index) => (
                    <span className="option">
                        <span className="short-label">Position {index + 1}</span>
                        <input type="checkbox" checked={checkbox} onChange={() => handleCheckboxChange(index)}/>
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
