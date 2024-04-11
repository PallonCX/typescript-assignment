import React, { useState, useEffect, useRef } from 'react';
import { SettingState } from '../types';
import "./Main.css";

interface MainProps {
    eventSource: EventSource | null;
    settings: SettingState;
}

interface Message {
    id: string;
    content: string;
}

const Main: React.FC<MainProps> = ({ eventSource, settings }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageTimeouts, setMessageTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({});

    useEffect(() => {
        if (!eventSource) return;

        const handleMessageEvent = (event: MessageEvent) => {
            const msgJson = JSON.parse(event.data);
            const msgContent = msgJson["msg"];
            const msgId = msgJson["msg_id"];
            setMessages(prev => [...prev, { id: msgId, content: msgContent }]);
            const timeoutId = setTimeout(() => {
                setMessages(prev => prev.filter(message => message.id !== msgId));
                setMessageTimeouts(prev => {
                    const updatedTimeouts = { ...prev };
                    delete updatedTimeouts[msgId];
                    return updatedTimeouts;
                });
            }, settings.messageDisappearTime);
            setMessageTimeouts(prev => ({ ...prev, [msgId]: timeoutId }));
        };

        eventSource.addEventListener('message', handleMessageEvent);

        return () => {
            eventSource.removeEventListener('message', handleMessageEvent);

            Object.values(messageTimeouts).forEach(timeoutId => {
                clearTimeout(timeoutId);
            });
        };
    }, [eventSource, settings.messageDisappearTime]);
    
    useEffect(() => {
        if (messages.length > settings.messageCount) {
            setMessages(prev => prev.slice(-settings.messageCount));
        }
        if (messages.length > 8) {
            setMessages(prev => prev.slice(-8));
        }
    }, [messages, settings.messageCount]);

    const changeMessagePositionStyle = (position: number) => {
        switch (position) {
            case 1:
                return "message-container-1";
            case 2:
                return "message-container-2";
            case 3:
                return "message-container-3";
            case 4:
                return "message-container-4";
        }
    }

    const removeMessage = (messageId: string) => {
        clearTimeout(messageTimeouts[messageId]);
        setMessages(prev => prev.filter(message => message.id !== messageId));
        setMessageTimeouts(prev => {
            const updatedTimeouts = { ...prev };
            delete updatedTimeouts[messageId];
            return updatedTimeouts;
        });
    };

    const handleMouseEnter = (messageId: string) => {
        clearTimeout(messageTimeouts[messageId]);
    };

    const handleMouseLeave = (messageId: string) => {
        const timeoutId = setTimeout(() => {
            setMessages(prev => prev.filter(message => message.id !== messageId));
            setMessageTimeouts(prev => {
                const updatedTimeouts = { ...prev };
                delete updatedTimeouts[messageId];
                return updatedTimeouts;
            });
        }, settings.messageDisappearTime);
        setMessageTimeouts(prev => ({ ...prev, [messageId]: timeoutId }));
    };

    return (
        <div className={changeMessagePositionStyle(settings.messagePosition)}>
            {messages.map(({id, content}) => (
                <div key={id} className="message" onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={() => handleMouseLeave(id)}>
                    <span className="message-main">
                        <span className="message-content">{content}</span>
                        <span className="remove-icon" onClick={() => removeMessage(id)}>&#10005;</span>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Main;
