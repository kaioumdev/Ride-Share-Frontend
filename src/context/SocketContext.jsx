import React, { createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Create socket with websocket-only transport.
// Vercel is a serverless platform — it does NOT support Socket.IO polling
// (long-polling requires a persistent HTTP connection that serverless kills).
// Forcing 'websocket' transport avoids the flood of 404 polling requests.
// NOTE: For full real-time support, host the backend on Railway, Render,
// Fly.io, or any platform that keeps a persistent Node.js process running.
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    transports: ['websocket'],       // skip polling entirely — avoids 404 spam on Vercel
    reconnection: true,
    reconnectionAttempts: 5,         // stop after 5 failed attempts instead of retrying forever
    reconnectionDelay: 2000,         // wait 2s between retries
    reconnectionDelayMax: 10000,     // cap retry wait at 10s
    timeout: 10000,
});

socket.on('connect_error', (err) => {
    console.warn('Socket connection failed:', err.message);
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
