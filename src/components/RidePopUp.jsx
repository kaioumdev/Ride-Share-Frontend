import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => props.setRidePopupPanel(false)}>
                <i className="text-3xl text-slate-300 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Gradient header */}
            <div className='bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 mb-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-indigo-200 text-xs font-semibold uppercase tracking-wider'>New Ride Request</p>
                        <h3 className='text-xl font-bold text-white mt-0.5'>Ride Available!</h3>
                    </div>
                    <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                        <i className='ri-notification-3-fill text-white text-lg'></i>
                    </div>
                </div>
            </div>

            {/* Rider info */}
            <div className='flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='w-12 h-12 rounded-full object-cover border-2 border-amber-200'
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="rider"
                    />
                    <div>
                        <h2 className='text-base font-bold text-slate-800 capitalize'>
                            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
                        </h2>
                        <p className='text-xs text-slate-500'>Rider</p>
                    </div>
                </div>
                <div className='text-right'>
                    <span className='text-sm font-bold text-slate-700'>2.2 KM</span>
                    <p className='text-xs text-slate-400'>from you</p>
                </div>
            </div>

            {/* Route */}
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
                        <p className='text-base font-bold text-indigo-600'>৳ {props.ride?.fare}</p>
                    </div>
                    <div className='ml-auto'>
                        <span className='text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full'>Cash</span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-3'>
                <button
                    onClick={() => { props.setConfirmRidePopupPanel(true); props.confirmRide() }}
                    className='flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2'
                >
                    <i className='ri-check-line text-lg'></i> Accept
                </button>
                <button
                    onClick={() => props.setRidePopupPanel(false)}
                    className='flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2'
                >
                    <i className='ri-close-line text-lg'></i> Ignore
                </button>
            </div>
        </div>
    )
}

export default RidePopUp
