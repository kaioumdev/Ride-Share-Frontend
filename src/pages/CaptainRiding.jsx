import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        gsap.to(finishRidePanelRef.current, { transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)' })
    }, [ finishRidePanel ])

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            {/* Top bar */}
            <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4 bg-white/95 backdrop-blur-sm shadow-sm'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
                        <i className='ri-car-fill text-white text-sm'></i>
                    </div>
                    <span className='font-bold text-lg text-slate-800'>RideShare</span>
                </div>
                <Link to='/captain-home' className='h-9 w-9 bg-slate-100 flex items-center justify-center rounded-full border border-slate-200'>
                    <i className="ri-logout-box-r-line text-slate-600 text-base"></i>
                </Link>
            </div>

            {/* Bottom action bar */}
            <div
                className='relative z-10 bg-white rounded-t-3xl shadow-2xl px-5 py-5 cursor-pointer'
                onClick={() => setFinishRidePanel(true)}
            >
                <div className='flex justify-center mb-3'>
                    <div className='w-10 h-1 bg-slate-200 rounded-full'></div>
                </div>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-xs text-slate-400 font-medium mb-1'>En route to destination</p>
                        <h4 className='text-lg font-bold text-slate-800'>4 KM away</h4>
                    </div>
                    <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center gap-2'>
                        <i className='ri-flag-line'></i>
                        Complete Ride
                    </button>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl px-5 py-6 pt-10'>
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>

            {/* Fullscreen map */}
            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>
        </div>
    )
}

export default CaptainRiding
