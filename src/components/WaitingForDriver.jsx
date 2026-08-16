import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => props.waitingForDriver(false)}>
                <i className="text-3xl text-slate-300 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Driver card */}
            <div className='flex items-center justify-between bg-slate-50 rounded-2xl p-4 mb-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='w-14 h-14 rounded-full object-cover border-2 border-indigo-200'
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                        alt="captain"
                    />
                    <div>
                        <h2 className='text-base font-bold text-slate-800 capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                        <p className='text-xs text-slate-400'>Your Captain</p>
                        <p className='text-xs text-slate-500 mt-0.5'>Maruti Suzuki Alto</p>
                    </div>
                </div>
                <div className='text-right'>
                    <span className='inline-block bg-amber-400 text-amber-900 font-bold text-sm px-3 py-1 rounded-lg tracking-widest'>
                        {props.ride?.captain.vehicle.plate}
                    </span>
                </div>
            </div>

            {/* OTP box — large and prominent so user can easily read it to captain */}
            <div className='bg-indigo-600 rounded-2xl p-5 mb-4 text-center shadow-lg shadow-indigo-200'>
                <p className='text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2'>
                    <i className='ri-shield-keyhole-line mr-1'></i>
                    Your Ride OTP — Share with Captain
                </p>
                {props.ride?.otp ? (
                    <p className='text-5xl font-extrabold text-white font-mono tracking-[0.5em] py-1'>
                        {props.ride.otp}
                    </p>
                ) : (
                    <p className='text-2xl font-bold text-indigo-300 animate-pulse py-2'>
                        Loading OTP...
                    </p>
                )}
                <p className='text-xs text-indigo-300 mt-2'>Tell this code to your captain to start the ride</p>
            </div>

            {/* Trip details */}
            <div className='bg-slate-50 rounded-2xl overflow-hidden'>
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
        </div>
    )
}

export default WaitingForDriver
