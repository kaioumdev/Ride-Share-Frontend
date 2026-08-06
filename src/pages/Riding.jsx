import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("ride-ended", () => { navigate('/home') })
        return () => socket.off("ride-ended")
    }, [ socket ])

    return (
        <div className='h-screen flex flex-col'>
            {/* Map */}
            <div className='h-1/2 relative'>
                <LiveTracking trackCaptain={true} />
                <Link to='/home' className='absolute right-4 top-4 h-10 w-10 bg-white shadow-lg flex items-center justify-center rounded-full z-10'>
                    <i className="text-lg text-slate-600 ri-home-5-line"></i>
                </Link>
            </div>

            {/* Bottom panel */}
            <div className='h-1/2 bg-white rounded-t-3xl shadow-2xl -mt-4 relative z-10 px-5 py-5 overflow-y-auto'>
                <div className='flex justify-center mb-4'>
                    <div className='w-10 h-1 bg-slate-200 rounded-full'></div>
                </div>

                {/* Status badge */}
                <div className='flex items-center gap-2 mb-4'>
                    <div className='flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        <span className='text-xs font-semibold text-green-700'>Ride in progress</span>
                    </div>
                </div>

                {/* Driver card */}
                <div className='flex items-center justify-between bg-slate-50 rounded-2xl p-4 mb-4'>
                    <div className='flex items-center gap-3'>
                        <img
                            className='w-12 h-12 rounded-full object-cover border-2 border-indigo-200'
                            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                            alt="captain"
                        />
                        <div>
                            <h2 className='text-base font-bold text-slate-800 capitalize'>{ride?.captain.fullname.firstname}</h2>
                            <p className='text-xs text-slate-400'>Your Captain</p>
                        </div>
                    </div>
                    <div className='text-right'>
                        <span className='inline-block bg-amber-400 text-amber-900 font-bold text-sm px-3 py-1 rounded-lg tracking-widest'>
                            {ride?.captain.vehicle.plate}
                        </span>
                    </div>
                </div>

                {/* Trip details */}
                <div className='bg-slate-50 rounded-2xl overflow-hidden mb-4'>
                    <div className='flex items-center gap-4 p-3.5 border-b border-slate-100'>
                        <div className='w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                        </div>
                        <div>
                            <p className='text-xs text-slate-400 font-medium'>Destination</p>
                            <p className='text-sm font-semibold text-slate-700'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-3.5'>
                        <div className='w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <i className="ri-currency-line text-indigo-600 text-sm"></i>
                        </div>
                        <div>
                            <p className='text-xs text-slate-400 font-medium'>Fare</p>
                            <p className='text-base font-bold text-indigo-600'>৳ {ride?.fare}</p>
                        </div>
                        <div className='ml-auto'>
                            <span className='text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full'>Cash</span>
                        </div>
                    </div>
                </div>

                <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2'>
                    <i className='ri-bank-card-line'></i>
                    Make a Payment
                </button>
            </div>
        </div>
    )
}

export default Riding
