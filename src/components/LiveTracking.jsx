import React, { useState, useEffect, useContext } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { SocketContext } from '../context/SocketContext'

const containerStyle = {
    width: '100%',
    height: '100%',
}

// Geolocation error codes:
// 1 = PERMISSION_DENIED  — user blocked location access
// 2 = POSITION_UNAVAILABLE — device can't determine location
// 3 = TIMEOUT — request timed out
const getGeolocationErrorMessage = (code) => {
    switch (code) {
        case 1: return 'Location access denied. Please allow location permission in your browser settings.'
        case 2: return 'Your location is currently unavailable. Using default map view.'
        case 3: return 'Location request timed out. Using default map view.'
        default: return 'Unable to get your location. Using default map view.'
    }
}

// LiveTracking accepts an optional prop `trackCaptain`
// When true (used in Riding.jsx): shows captain's position received via socket
// When false/absent (used in Home/CaptainHome): shows user's own GPS position
const LiveTracking = ({ trackCaptain = false }) => {
    const { socket } = useContext(SocketContext)

    const [ currentPosition, setCurrentPosition ] = useState(null)
    const [ captainPosition, setCaptainPosition ] = useState(null)
    const [ locationError, setLocationError ] = useState(null)
    const [ locationDenied, setLocationDenied ] = useState(false)

    // Always track own GPS position
    useEffect(() => {
        // Guard: browser may not support geolocation at all
        if (!navigator.geolocation) {
            setLocationError('Your browser does not support location services.')
            return
        }

        const handleSuccess = (pos) => {
            setLocationError(null)
            setLocationDenied(false)
            setCurrentPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        }

        const handleError = (err) => {
            const message = getGeolocationErrorMessage(err.code)
            setLocationError(message)
            if (err.code === 1) {
                // Permission denied — no point watching further
                setLocationDenied(true)
            }
        }

        const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }

        // Initial one-shot fetch
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)

        // Continuous watch (skipped if already denied to avoid repeated error spam)
        let watchId = null
        if (!locationDenied) {
            watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options)
        }

        return () => {
            if (watchId !== null) navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    // Listen for captain location updates (only when user is in a ride)
    useEffect(() => {
        if (!trackCaptain) return

        socket.on('captain-location-update', (location) => {
            setCaptainPosition({
                lat: location.ltd,
                lng: location.lng
            })
        })

        return () => socket.off('captain-location-update')
    }, [ trackCaptain, socket ])

    // Default center — fallback before GPS loads or when denied
    const mapCenter = trackCaptain
        ? (captainPosition || currentPosition || { lat: 23.8103, lng: 90.4125 })
        : (currentPosition || { lat: 23.8103, lng: 90.4125 })

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Location error / permission denied banner */}
            {locationError && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        background: locationDenied ? '#fef2f2' : '#fffbeb',
                        borderBottom: locationDenied ? '1px solid #fecaca' : '1px solid #fde68a',
                        color: locationDenied ? '#b91c1c' : '#92400e',
                        fontSize: '13px',
                        fontWeight: 500,
                    }}
                >
                    <span style={{ fontSize: '16px' }}>{locationDenied ? '🔒' : '⚠️'}</span>
                    <span>{locationError}</span>
                    {locationDenied && (
                        <span style={{ marginLeft: 'auto', fontSize: '11px', opacity: 0.7 }}>
                            Showing default area
                        </span>
                    )}
                </div>
            )}

            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={currentPosition ? 15 : 12}
                >
                    {/* Always show user's own position when available */}
                    {currentPosition && (
                        <Marker
                            position={currentPosition}
                            title="You"
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                            }}
                        />
                    )}

                    {/* Show captain's position when tracking during a ride */}
                    {trackCaptain && captainPosition && (
                        <Marker
                            position={captainPosition}
                            title="Captain"
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/cabs/taxi.png'
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default LiveTracking
