import React, { useState, useEffect, useContext } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { SocketContext } from '../context/SocketContext'

const containerStyle = {
    width: '100%',
    height: '100%',
}

// LiveTracking accepts an optional prop `trackCaptain`
// When true (used in Riding.jsx): shows captain's position received via socket
// When false/absent (used in Home/CaptainHome): shows user's own GPS position
const LiveTracking = ({ trackCaptain = false }) => {
    const { socket } = useContext(SocketContext)

    const [ currentPosition, setCurrentPosition ] = useState(null)
    const [ captainPosition, setCaptainPosition ] = useState(null)

    // Always track own GPS position
    useEffect(() => {
        const getPos = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCurrentPosition({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    })
                },
                (err) => console.error('Geolocation error:', err),
                { enableHighAccuracy: true }
            )
        }

        getPos()
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                setCurrentPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
            },
            (err) => console.error('Geolocation watch error:', err),
            { enableHighAccuracy: true }
        )

        return () => navigator.geolocation.clearWatch(watchId)
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

    // Default center — fallback before GPS loads
    const mapCenter = trackCaptain
        ? (captainPosition || currentPosition || { lat: 23.8103, lng: 90.4125 })
        : (currentPosition || { lat: 23.8103, lng: 90.4125 })

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={15}
            >
                {/* Always show user's own position */}
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
    )
}

export default LiveTracking
