import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// ─── WHY TWO SEPARATE URLS? ───────────────────────────────────────────────────
// VITE_BASE_URL  → Vercel (REST API: login, register, rides, maps)
//                  Vercel is serverless — each request spins a fresh process.
//                  REST is stateless so this works perfectly.
//
// VITE_SOCKET_URL → Render (Socket.IO: real-time ride events, location updates)
//                   Render keeps a persistent Node.js process running so
//                   WebSocket connections stay alive. Vercel kills them immediately.
//
// In local development both point to http://localhost:5005 (same server).
// ─────────────────────────────────────────────────────────────────────────────

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_BASE_URL;

const socket = io(SOCKET_URL, {
    // Use both transports:
    // - 'websocket' is tried first (fast, persistent)
    // - 'polling' is fallback in case the network blocks WebSocket upgrades
    transports: [ 'websocket', 'polling' ],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    timeout: 10000,
    // Don't auto-connect on module load — connect after user logs in
    // by calling socket.connect() manually if needed.
    // (leaving autoConnect: true is fine for this app)
});

socket.on('connect_error', (err) => {
    console.warn('[Socket] connection failed:', err.message);
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('[Socket] connected:', socket.id, '→', SOCKET_URL);
        });

        socket.on('disconnect', (reason) => {
            console.log('[Socket] disconnected:', reason);
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
