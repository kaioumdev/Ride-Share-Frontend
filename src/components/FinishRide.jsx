import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` }
        })
        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => props.setFinishRidePanel(false)}>
                <i className="text-3xl text-slate-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-xl font-bold text-slate-800 mb-4'>Finish This Ride</h3>

            {/* Rider card */}
            <div className='flex items-center justify-between bg-slate-50 rounded-2xl p-4 mb-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='w-12 h-12 rounded-full object-cover border-2 border-indigo-200'
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="rider"
                    />
                    <div>
                        <h2 className='text-base font-bold text-slate-800 capitalize'>{props.ride?.user.fullname.firstname}</h2>
                        <p className='text-xs text-slate-400'>Rider</p>
                    </div>
                </div>
                <div className='text-right bg-indigo-50 rounded-xl px-4 py-2'>
                    <p className='text-xs text-slate-400 mb-0.5'>Total Fare</p>
                    <h4 className='text-xl font-extrabold text-indigo-600'>৳{props.ride?.fare}</h4>
                </div>
            </div>

            {/* Trip summary */}
            <div className='bg-slate-50 rounded-2xl overflow-hidden mb-5'>
                <div className='flex items-center gap-4 p-3.5 border-b border-slate-100'>
                    <div className='w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>Pickup</p>
                        <p className='text-sm font-semibold text-slate-700'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-3.5 border-b border-slate-100'>
                    <div className='w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>Destination</p>
                        <p className='text-sm font-semibold text-slate-700'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-3.5'>
                    <div className='w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <i className="ri-currency-line text-indigo-600 text-sm"></i>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>Payment</p>
                        <p className='text-sm font-semibold text-slate-700'>Cash · ৳{props.ride?.fare}</p>
                    </div>
                    <div className='ml-auto'>
                        <span className='text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full'>Cash</span>
                    </div>
                </div>
            </div>

            <button
                onClick={endRide}
                className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2'
            >
                <i className='ri-flag-line'></i>
                Finish Ride
            </button>
        </div>
    )
}

export default FinishRide
