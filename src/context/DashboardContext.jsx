
// import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
// import config from '@/config.js/config';

// const DashboardContext = createContext();

// export const DashboardProvider = ({ children }) => {
//     const [state, setState] = useState({
//         arbiPairData: [],
//         arbiTrackData: [],
//         error: null,
//         timeUntilNextRefresh: 300,
//         lastRefreshTime: null,
//         nextRefreshTime: null,
//         serverTime: null,
//         initialized: false,
//         isRefreshing: false,
//         isOnline: navigator.onLine,
//         isWebSocketConnected: false
//     });

//     const [ws, setWs] = useState(null);
//     const [reconnectAttempts, setReconnectAttempts] = useState(0);

//     const getToken = () => localStorage.getItem('authToken');

//     const formatArbiTrackData = (data) => {
//         if (!data || typeof data !== 'object') return [];
//         return Object.entries(data).map(([coin, info]) => ({
//             coin1: coin,
//             minExchange: info.lowestExchange || 'N/A',
//             minPrice1: Number(info.lowestPrice || 0).toFixed(2),
//             maxExchange: info.highestExchange || 'N/A',
//             maxPrice1: Number(info.highestPrice || 0).toFixed(2),
//             profitPercentage: Number(info.profitPercentage || 0).toFixed(2)
//         }));
//     };

//     const connectWebSocket = useCallback(() => {
//         const token = getToken();
//         if (!token || !state.isOnline) return;

//         const wsUrl = `${config.WS_URL}/?token=${token}`;
//         const websocket = new WebSocket(wsUrl);

//         websocket.onopen = () => {
//             console.log('WebSocket connected');
//             setState(prev => ({ ...prev, isWebSocketConnected: true, error: null }));
//             setReconnectAttempts(0); // Reset attempts on success
//         };

//         websocket.onmessage = (event) => {
//             try {
//                 const { key, data, lastRefreshTime, ttl, nextRefreshTime, timeUntilNextRefresh, serverTime } = JSON.parse(event.data);
//                 setState(prev => ({
//                     ...prev,
//                     [key === 'arbitrack_data' ? 'arbiTrackData' : 'arbiPairData']: key === 'arbitrack_data' ? formatArbiTrackData(data) : (data.results || data),
//                     lastRefreshTime,
//                     nextRefreshTime,
//                     timeUntilNextRefresh: ttl, // Reset to 300 seconds
//                     serverTime,
//                     error: null,
//                     initialized: true
//                 }));
//             } catch (error) {
//                 console.error('WebSocket message parse error:', error);
//                 setState(prev => ({ ...prev, error: 'Failed to process WebSocket data' }));
//             }
//         };

//         websocket.onclose = (event) => {
//             console.log('WebSocket disconnected, code:', event.code, 'reason:', event.reason);
//             setState(prev => ({ ...prev, isWebSocketConnected: false }));
//             if (state.isOnline) {
//                 // Reconnect with exponential backoff (1s, 2s, 4s, ..., max 30s)
//                 const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
//                 setTimeout(() => {
//                     setReconnectAttempts(prev => prev + 1);
//                     connectWebSocket();
//                 }, delay);
//             }
//         };

//         websocket.onerror = (error) => {
//             console.error('WebSocket error:', error);
//             setState(prev => ({ ...prev, isWebSocketConnected: false, error: 'WebSocket connection failed' }));
//         };

//         setWs(websocket);
//     }, [state.isOnline, reconnectAttempts]);

//     const fetchArbiPairData = useCallback(async (retries = 3) => {
//         const token = getToken();
//         if (!token || !state.isOnline) {
//             return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
//         }

//         for (let attempt = 1; attempt <= retries; attempt++) {
//             try {
//                 const response = await fetch(`${config.API_URL}/api/arbitrage`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const { data, lastRefreshTime, ttl, nextRefreshTime, timeUntilNextRefresh, serverTime } = await response.json();
//                 return {
//                     data: Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [],
//                     lastRefreshTime,
//                     ttl,
//                     nextRefreshTime,
//                     timeUntilNextRefresh,
//                     serverTime
//                 };
//             } catch (error) {
//                 console.error(`ArbiPair fetch failed (attempt ${attempt}/${retries}):`, error);
//                 if (attempt === retries) {
//                     setState(prev => ({ ...prev, error: error.message }));
//                     return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
//                 }
//                 await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
//             }
//         }
//     }, [state.isOnline]);

//     const fetchArbiTrackData = useCallback(async (retries = 3) => {
//         const token = getToken();
//         if (!token || !state.isOnline) {
//             return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
//         }

//         for (let attempt = 1; attempt <= retries; attempt++) {
//             try {
//                 const response = await fetch(`${config.API_URL}/api/arbitrage/arbitrack`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const { data, lastRefreshTime, ttl, nextRefreshTime, timeUntilNextRefresh, serverTime } = await response.json();
//                 return {
//                     data: formatArbiTrackData(data),
//                     lastRefreshTime,
//                     ttl,
//                     nextRefreshTime,
//                     timeUntilNextRefresh,
//                     serverTime
//                 };
//             } catch (error) {
//                 console.error(`ArbiTrack fetch failed (attempt ${attempt}/${retries}):`, error);
//                 if (attempt === retries) {
//                     setState(prev => ({ ...prev, error: error.message }));
//                     return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
//                 }
//                 await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
//             }
//         }
//     }, [state.isOnline]);

//     const refreshData = useCallback(async () => {
//         const token = getToken();
//         if (!token || !state.isOnline) return;

//         if (state.isRefreshing) return;
//         setState(prev => ({ ...prev, isRefreshing: true }));

//         try {
//             const [arbiPairResult, arbiTrackResult] = await Promise.all([
//                 fetchArbiPairData(),
//                 fetchArbiTrackData()
//             ]);

//             const lastRefreshTime = Math.max(
//                 arbiPairResult.lastRefreshTime || Date.now(),
//                 arbiTrackResult.lastRefreshTime || Date.now()
//             );
//             const nextRefreshTime = Math.max(
//                 arbiPairResult.nextRefreshTime || (Date.now() + 300 * 1000),
//                 arbiTrackResult.nextRefreshTime || (Date.now() + 300 * 1000)
//             );
//             const timeUntilNextRefresh = Math.max(
//                 arbiPairResult.timeUntilNextRefresh || 300,
//                 arbiTrackResult.timeUntilNextRefresh || 300
//             );
//             const serverTime = arbiPairResult.serverTime || arbiTrackResult.serverTime || Date.now();

//             setState(prev => ({
//                 ...prev,
//                 arbiPairData: arbiPairResult.data,
//                 arbiTrackData: arbiTrackResult.data,
//                 lastRefreshTime,
//                 nextRefreshTime,
//                 timeUntilNextRefresh,
//                 serverTime,
//                 error: null,
//                 initialized: true,
//                 isRefreshing: false
//             }));
//         } catch (error) {
//             setState(prev => ({ ...prev, error: error.message, isRefreshing: false }));
//         }
//     }, [fetchArbiPairData, fetchArbiTrackData, state.isOnline]);

//     // Monitor online/offline status
//     useEffect(() => {
//         const handleOnline = () => {
//             setState(prev => ({ ...prev, isOnline: true, error: null }));
//             connectWebSocket();
//             refreshData();
//         };
//         const handleOffline = () => {
//             setState(prev => ({ ...prev, isOnline: false, isWebSocketConnected: false }));
//             ws?.close();
//         };

//         window.addEventListener('online', handleOnline);
//         window.addEventListener('offline', handleOffline);

//         return () => {
//             window.removeEventListener('online', handleOnline);
//             window.removeEventListener('offline', handleOffline);
//         };
//     }, [connectWebSocket, refreshData, ws]);

//     // Initial data fetch and WebSocket connection
//     useEffect(() => {
//         if (state.isOnline) {
//             refreshData();
//             connectWebSocket();
//         }
//         return () => ws?.close();
//     }, [refreshData, connectWebSocket, state.isOnline]);

//     // Handle token changes (login/logout)
//     useEffect(() => {
//         const handleStorageChange = () => {
//             ws?.close();
//             connectWebSocket();
//         };
//         window.addEventListener('storage', handleStorageChange);
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, [connectWebSocket]);

//     // Dynamic countdown timer (runs even when offline)
//     useEffect(() => {
//         if (!state.initialized || !state.nextRefreshTime || !state.serverTime) return;

//         const clientServerTimeDiff = Date.now() - state.serverTime;
//         const timerInterval = setInterval(() => {
//             setState(prev => {
//                 if (!prev.nextRefreshTime || !prev.serverTime) return prev;
//                 const adjustedNow = Date.now() - clientServerTimeDiff;
//                 const timeUntilNextRefresh = Math.max(0, Math.floor((prev.nextRefreshTime - adjustedNow) / 1000));
//                 if (timeUntilNextRefresh <= 0) {
//                     // Reset timer to 300 seconds (local fallback)
//                     return {
//                         ...prev,
//                         timeUntilNextRefresh: 300,
//                         nextRefreshTime: adjustedNow + 300 * 1000
//                     };
//                 }
//                 return { ...prev, timeUntilNextRefresh };
//             });
//         }, 1000);

//         return () => clearInterval(timerInterval);
//     }, [state.initialized, state.nextRefreshTime, state.serverTime]);

//     const contextValue = {
//         arbiPairData: state.arbiPairData,
//         arbiTrackData: state.arbiTrackData,
//         error: state.error,
//         timeUntilNextRefresh: state.timeUntilNextRefresh,
//         isInitialized: state.initialized,
//         isOnline: state.isOnline,
//         isWebSocketConnected: state.isWebSocketConnected,
//         refreshData
//     };

//     return (
//         <DashboardContext.Provider value={contextValue}>
//             {children}
//         </DashboardContext.Provider>
//     );
// };

// export const useDashboard = () => {
//     const context = useContext(DashboardContext);
//     if (!context) {
//         throw new Error('useDashboard must be used within a DashboardProvider');
//     }
//     return context;
// };

// frontend/src/DashboardContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import config from '@/config.js/config';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [state, setState] = useState({
        arbiPairData: [],
        arbiTrackData: [],
        error: null,
        timeUntilNextRefresh: 300,
        lastRefreshTime: null,
        nextRefreshTime: null,
        serverTime: null,
        initialized: false,
        isRefreshing: false,
        isOnline: navigator.onLine,
        isWebSocketConnected: false
    });

    const [ws, setWs] = useState(null);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);

    const getToken = () => localStorage.getItem('authToken');

    const formatArbiTrackData = (data) => {
        if (!data || typeof data !== 'object') return [];
        return Object.entries(data).map(([coin, info]) => ({
            coin1: coin,
            minExchange: info.lowestExchange || 'N/A',
            minPrice1: Number(info.lowestPrice || 0).toFixed(2),
            maxExchange: info.highestExchange || 'N/A',
            maxPrice1: Number(info.highestPrice || 0).toFixed(2),
            profitPercentage: Number(info.profitPercentage || 0).toFixed(2)
        }));
    };

    const connectWebSocket = useCallback(() => {
        const token = getToken();
        if (!token || !state.isOnline) return;

        const wsUrl = `${config.WS_URL}/?token=${token}`;
        const websocket = new WebSocket(wsUrl);

        websocket.onopen = () => {
            console.log('WebSocket connected');
            setState(prev => ({ ...prev, isWebSocketConnected: true, error: null }));
            setReconnectAttempts(0);
        };

        websocket.onmessage = (event) => {
            try {
                const { key, data, lastRefreshTime, ttl, nextRefreshTime, timeUntilNextRefresh, serverTime } = JSON.parse(event.data);
                setState(prev => ({
                    ...prev,
                    [key === 'arbitrack_data' ? 'arbiTrackData' : 'arbiPairData']: key === 'arbitrack_data' ? formatArbiTrackData(data) : (data.results || data),
                    lastRefreshTime,
                    nextRefreshTime,
                    timeUntilNextRefresh: ttl,
                    serverTime,
                    error: null,
                    initialized: true
                }));
            } catch (error) {
                console.error('WebSocket message parse error:', error);
                setState(prev => ({ ...prev, error: 'Failed to process WebSocket data' }));
            }
        };

        websocket.onclose = (event) => {
            console.log('WebSocket disconnected, code:', event.code, 'reason:', event.reason);
            setState(prev => ({ ...prev, isWebSocketConnected: false }));
            if (state.isOnline && event.code !== 4001 && event.code !== 4002) {
                const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
                setTimeout(() => {
                    setReconnectAttempts(prev => prev + 1);
                    connectWebSocket();
                }, delay);
            }
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setState(prev => ({ ...prev, isWebSocketConnected: false }));
        };

        setWs(websocket);
    }, [state.isOnline, reconnectAttempts]);

    const fetchArbiPairData = useCallback(async (retries = 3) => {
        const token = getToken();
        if (!token || !state.isOnline) {
            return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await fetch(`${config.API_URL}/api/arbitrage`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const { data, lastRefreshTime, ttl, nextRefreshTime, timeUntilNextRefresh, serverTime } = await response.json();
                return {
                    data: Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [],
                    lastRefreshTime,
                    ttl,
                    nextRefreshTime,
                    timeUntilNextRefresh,
                    serverTime
                };
            } catch (error) {
                console.error(`ArbiPair fetch failed (attempt ${attempt}/${retries}):`, error);
                if (attempt === retries) {
                    setState(prev => ({ ...prev, error: error.message }));
                    return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }, [state.isOnline]);

    const fetchArbiTrackData = useCallback(async (retries = 3) => {
        const token = getToken();
        if (!token || !state.isOnline) {
            return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await fetch(`${config.API_URL}/api/arbitrage/arbitrack`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const { data, lastRefreshTime, ttl, nextRefreshTime, timeUntilNextRefresh, serverTime } = await response.json();
                return {
                    data: formatArbiTrackData(data),
                    lastRefreshTime,
                    ttl,
                    nextRefreshTime,
                    timeUntilNextRefresh,
                    serverTime
                };
            } catch (error) {
                console.error(`ArbiTrack fetch failed (attempt ${attempt}/${retries}):`, error);
                if (attempt === retries) {
                    setState(prev => ({ ...prev, error: error.message }));
                    return { data: [], lastRefreshTime: null, ttl: 300, nextRefreshTime: null, timeUntilNextRefresh: 300, serverTime: null };
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }, [state.isOnline]);

    const refreshData = useCallback(async () => {
        const token = getToken();
        if (!token || !state.isOnline) return;

        if (state.isRefreshing) return;
        setState(prev => ({ ...prev, isRefreshing: true }));

        try {
            const [arbiPairResult, arbiTrackResult] = await Promise.all([
                fetchArbiPairData(),
                fetchArbiTrackData()
            ]);

            const lastRefreshTime = Math.max(
                arbiPairResult.lastRefreshTime || Date.now(),
                arbiTrackResult.lastRefreshTime || Date.now()
            );
            const nextRefreshTime = Math.max(
                arbiPairResult.nextRefreshTime || (Date.now() + 300 * 1000),
                arbiTrackResult.nextRefreshTime || (Date.now() + 300 * 1000)
            );
            const timeUntilNextRefresh = Math.max(
                arbiPairResult.timeUntilNextRefresh || 300,
                arbiTrackResult.timeUntilNextRefresh || 300
            );
            const serverTime = arbiPairResult.serverTime || arbiTrackResult.serverTime || Date.now();

            setState(prev => ({
                ...prev,
                arbiPairData: arbiPairResult.data,
                arbiTrackData: arbiTrackResult.data,
                lastRefreshTime,
                nextRefreshTime,
                timeUntilNextRefresh,
                serverTime,
                error: null,
                initialized: true,
                isRefreshing: false
            }));
        } catch (error) {
            setState(prev => ({ ...prev, error: error.message, isRefreshing: false }));
        }
    }, [fetchArbiPairData, fetchArbiTrackData, state.isOnline]);

    useEffect(() => {
        const handleOnline = () => {
            setState(prev => ({ ...prev, isOnline: true, error: null }));
            connectWebSocket();
            refreshData();
        };
        const handleOffline = () => {
            setState(prev => ({ ...prev, isOnline: false, isWebSocketConnected: false }));
            ws?.close();
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [connectWebSocket, refreshData, ws]);

    useEffect(() => {
        if (state.isOnline) {
            refreshData();
            connectWebSocket();
        }
        return () => ws?.close();
    }, [refreshData, connectWebSocket, state.isOnline]);

    useEffect(() => {
        const handleStorageChange = () => {
            ws?.close();
            connectWebSocket();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [connectWebSocket]);

    useEffect(() => {
        if (!state.initialized || !state.nextRefreshTime || !state.serverTime) return;

        const clientServerTimeDiff = Date.now() - state.serverTime;
        const timerInterval = setInterval(() => {
            setState(prev => {
                if (!prev.nextRefreshTime || !prev.serverTime) return prev;
                const adjustedNow = Date.now() - clientServerTimeDiff;
                const timeUntilNextRefresh = Math.max(0, Math.floor((prev.nextRefreshTime - adjustedNow) / 1000));
                if (timeUntilNextRefresh <= 0) {
                    return {
                        ...prev,
                        timeUntilNextRefresh: 300,
                        nextRefreshTime: adjustedNow + 300 * 1000
                    };
                }
                return { ...prev, timeUntilNextRefresh };
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [state.initialized, state.nextRefreshTime, state.serverTime]);

    const contextValue = {
        arbiPairData: state.arbiPairData,
        arbiTrackData: state.arbiTrackData,
        error: state.error,
        timeUntilNextRefresh: state.timeUntilNextRefresh,
        isInitialized: state.initialized,
        isOnline: state.isOnline,
        isWebSocketConnected: state.isWebSocketConnected,
        refreshData
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};