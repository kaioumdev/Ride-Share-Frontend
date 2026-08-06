import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        if (e.target.value.length < 3) { setPickupSuggestions([]); return }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setPickupSuggestions(response.data)
        } catch { }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        if (e.target.value.length < 3) { setDestinationSuggestions([]); return }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setDestinationSuggestions(response.data)
        } catch { }
    }

    const submitHandler = (e) => { e.preventDefault() }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, { height: '70%', padding: 24 })
            gsap.to(panelCloseRef.current, { opacity: 1 })
        } else {
            gsap.to(panelRef.current, { height: '0%', padding: 0 })
            gsap.to(panelCloseRef.current, { opacity: 0 })
        }
    }, [ panelOpen ])

    useGSAP(function () {
        gsap.to(vehiclePanelRef.current, { transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)' })
    }, [ vehiclePanel ])

    useGSAP(function () {
        gsap.to(confirmRidePanelRef.current, { transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)' })
    }, [ confirmRidePanel ])

    useGSAP(function () {
        gsap.to(vehicleFoundRef.current, { transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)' })
    }, [ vehicleFound ])

    useGSAP(function () {
        gsap.to(waitingForDriverRef.current, { transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)' })
    }, [ waitingForDriver ])

    async function findTrip() {
        if (!pickup || pickup.trim().length < 3) { alert('Please enter a valid pick-up location'); return }
        if (!destination || destination.trim().length < 3) { alert('Please enter a valid destination'); return }
        setVehiclePanel(true)
        setPanelOpen(false)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setFare(response.data)
        } catch (err) {
            console.error('Failed to get fare:', err)
            setVehiclePanel(false)
            alert('Could not calculate fare. Please try again.')
        }
    }

    async function createRide() {
        if (!pickup || !destination || !vehicleType) { console.error('Missing ride fields'); return }
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, { pickup, destination, vehicleType }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        } catch (err) { console.error('Failed to create ride:', err) }
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Logo overlay */}
            <div className='absolute left-4 top-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md'>
                <div className='w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center'>
                    <i className='ri-car-fill text-white text-xs'></i>
                </div>
                <span className='font-bold text-sm text-slate-800'>RideShare</span>
            </div>

            {/* Map */}
            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>

            {/* Bottom sheet */}
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='bg-white rounded-t-3xl shadow-2xl relative px-5 pt-2 pb-5'>
                    <div className='flex justify-center mb-3'>
                        <div className='w-10 h-1 bg-slate-200 rounded-full'></div>
                    </div>
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-5 top-5 text-slate-400 cursor-pointer'>
                        <i className="ri-close-line text-2xl"></i>
                    </h5>
                    <h4 className='text-xl font-bold text-slate-800 mb-4'>Where are you going?</h4>
                    <form className='space-y-3' onSubmit={submitHandler}>
                        <div className='relative'>
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-600 rounded-full'></div>
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='bg-slate-100 pl-8 pr-4 py-3 text-sm rounded-xl w-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                                type="text"
                                placeholder='Add a pick-up location'
                            />
                        </div>
                        <div className='relative'>
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full'></div>
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='bg-slate-100 pl-8 pr-4 py-3 text-sm rounded-xl w-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                                type="text"
                                placeholder='Enter your destination'
                            />
                        </div>
                    </form>
                    <button
                        onClick={findTrip}
                        disabled={!pickup || !destination}
                        className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2'
                    >
                        <i className='ri-search-line'></i>
                        Find a Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0 overflow-y-auto'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>

            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl px-5 py-6 pt-10'>
                <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl px-5 py-6 pt-10'>
                <ConfirmRide createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl px-5 py-6 pt-10'>
                <LookingForDriver createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white rounded-t-3xl shadow-2xl px-5 py-6 pt-10'>
                <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home
