import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const [ otpError, setOtpError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        if (!otp || otp.trim().length !== 6) {
            setOtpError('Please enter the 6-digit OTP')
            return
        }

        setOtpError('')
        setLoading(true)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp.trim()
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captain-token')}`
                }
            })

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
                navigate('/captain-riding', { state: { ride: props.ride } })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setOtpError('Invalid OTP. Please check and try again.')
            } else {
                setOtpError('Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Drag handle / close */}
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
                onClick={() => props.setRidePopupPanel(false)}
            >
                <i className="text-3xl text-slate-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-xl font-bold text-slate-800 mb-4'>Start the Ride</h3>

            {/* Rider card */}
            <div className='flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='w-12 h-12 rounded-full object-cover border-2 border-amber-200'
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="rider"
                    />
                    <div>
                        <h2 className='text-base font-bold text-slate-800 capitalize'>
                            {props.ride?.user.fullname.firstname}
                        </h2>
                        <p className='text-xs text-slate-500'>Rider</p>
                    </div>
                </div>
                <span className='text-sm font-bold text-slate-700'>2.2 KM</span>
            </div>

            {/* Trip details */}
            <div className='bg-slate-50 rounded-2xl overflow-hidden mb-4'>
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
                        <p className='text-xs text-slate-400 font-medium'>Fare</p>
                        <p className='text-base font-bold text-indigo-600'>৳{props.ride?.fare}</p>
                    </div>
                    <div className='ml-auto'>
                        <span className='text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full'>Cash</span>
                    </div>
                </div>
            </div>

            {/* OTP display — captain sees the expected OTP to verify with the user */}
            {props.ride?.otp && (
                <div className='bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-4 mb-4 text-center'>
                    <p className='text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1'>
                        <i className='ri-shield-keyhole-line mr-1'></i>
                        Expected OTP from Rider
                    </p>
                    <p className='text-4xl font-extrabold text-indigo-700 font-mono tracking-[0.4em]'>
                        {props.ride.otp}
                    </p>
                    <p className='text-xs text-indigo-400 mt-1'>Ask the rider to confirm this OTP</p>
                </div>
            )}

            {/* OTP form */}
            <form onSubmit={submitHander}>
                <label className='block text-sm font-bold text-slate-700 mb-2'>Enter Rider OTP</label>
                <input
                    value={otp}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                        setOtp(val)
                        setOtpError('')
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className='bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-500 px-5 py-4 font-mono text-2xl font-bold text-indigo-700 rounded-xl w-full text-center tracking-[0.4em] focus:outline-none transition'
                    placeholder='------'
                />
                {otpError && (
                    <p className='text-red-500 text-sm mt-1.5 px-1'>{otpError}</p>
                )}

                <button
                    type='submit'
                    disabled={loading || otp.length !== 6}
                    className='w-full mt-4 bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2'
                >
                    {loading ? (
                        <>
                            <i className='ri-loader-4-line animate-spin'></i>
                            Starting...
                        </>
                    ) : (
                        <>
                            <i className='ri-play-circle-fill'></i>
                            Start Ride
                        </>
                    )}
                </button>

                <button
                    type='button'
                    onClick={() => {
                        props.setConfirmRidePopupPanel(false)
                        props.setRidePopupPanel(false)
                    }}
                    className='w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2'
                >
                    <i className='ri-close-line'></i>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default ConfirmRidePopUp
