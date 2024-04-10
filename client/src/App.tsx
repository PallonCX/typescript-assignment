import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Setting from './pages/Setting';
import { SettingState } from './types';
import './App.css';

const App = () => {
    const [eventSource, setEventSource] = useState<EventSource | null>(null);

    const [settings, setSettings] = useState<SettingState>({
        messageCount: 5,
        messagePosition: 1,
        messageDisappearTime: 5000
    });

    useEffect(() => {
        const source = new EventSource('http://localhost:9000/events');
        setEventSource(source);

        return () => {
            source.close();
        };
    }, []);

    const handleChangeSetting = (newSettings: Partial<SettingState>) => {
        setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    }

    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Main 
                    eventSource={eventSource}
                    settings={settings}
                />} />
                <Route path='/setting' element={<Setting 
                    settings={settings}
                    onChangeSetting={handleChangeSetting}
                />} />
            </Routes>
        </HashRouter>
    );
};

export default App;