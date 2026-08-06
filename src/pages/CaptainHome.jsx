import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', { userId: captain._id, userType: 'captain' })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: { ltd: position.coords.latitude, lng: position.coords.longitude }
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
        socket.on('connect', () => {
            socket.emit('join', { userId: captain._id, userType: 'captain' })
        })
        return () => { clearInterval(locationInterval); socket.off('connect') }
    }, [])

    useEffect(() => {
        socket.on('new-ride', (data) => { setRide(data); setRidePopupPanel(true) })
        return () => socket.off('new-ride')
    }, [ socket ])

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id, captainId: captain._id,
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` } })
        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    useGSAP(function () {
        gsap.to(ridePopupPanelRef.current, { transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)' })
    }, [ ridePopupPanel ])

    useGSAP(function () {
        gsap.to(confirmRidePopupPanelRef.current, { transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)' })
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen bg-slate-50 flex flex-col'>
            {/* Top bar */}
            <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4 bg-white/95 backdrop-blur-sm shadow-sm'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
                        <i className='ri-car-fill text-white text-sm'></i>
                    </div>
                    <span className='font-bold text-lg text-slate-800'>RideShare</span>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1 rounded-full'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        <span className='text-xs font-semibold text-green-700'>Online</span>
                    </div>
                    <Link to='/captain-home' className='h-9 w-9 bg-slate-100 flex items-center justify-center rounded-full border border-slate-200'>
                        <i className="ri-logout-box-r-line text-slate-600 text-base"></i>
                    </Link>
                </div>
            </div>

            {/* Map */}
            <div className='h-[60%] w-full mt-16'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Live map" />
            </div>

            {/* Captain details */}
            <div className='h-[40%] bg-white rounded-t-3xl shadow-2xl px-5 py-5 overflow-y-auto'>
                <div className='flex justify-center mb-3'>
                    <div className='w-10 h-1 bg-slate-200 rounded-full'></div>
                </div>
                <CaptainDetails />
            </div>

            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl px-5 py-6 pt-10'>
                <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} confirmRide={confirmRide} />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-10'>
                <ConfirmRidePopUp ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome
