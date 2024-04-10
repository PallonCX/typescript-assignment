import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Setting from './pages/Setting';
import './App.css';

const App = () => {
    const [messageCount, setMessageCount] = useState<number>(5);
    const [messagePosition, setMessagePosition] = useState<number>(1);
    const [messageDisappearTime, setMessageDisappearTime] = useState<number>(5000);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);

    useEffect(() => {
        const source = new EventSource('http://localhost:9000/events');
        setEventSource(source);

        return () => {
            source.close();
        };
    }, []);

    const handleChangeMessageCount = (count: number) => {
        setMessageCount(count);
    }

    const handleMessagePositionChange = (position: number) => {
        setMessagePosition(position);
    }

    const handleMessageDisappearTimeChange = (position: number) => {
        setMessageDisappearTime(position);
    }

    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Main 
                    eventSource={eventSource}
                    messageCount={messageCount}
                    messagePosition={messagePosition}
                    messageDisappearTime={messageDisappearTime}
                />} />
                <Route path='/setting' element={<Setting 
                    messageCount={messageCount} 
                    onMessageCountChange={handleChangeMessageCount}
                    messagePosition={messagePosition}
                    onMessagePositionChange={handleMessagePositionChange}
                    messageDisappearTime={messageDisappearTime}
                    onMessageDisappearTimeChange={handleMessageDisappearTimeChange}
                />} />
            </Routes>
        </HashRouter>
    );
};

export default App;