import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => props.setVehicleFound(false)}>
                <i className="text-3xl text-slate-300 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Animated searching state */}
            <div className='flex flex-col items-center py-4 mb-4'>
                <div className='relative flex items-center justify-center mb-4'>
                    <div className='absolute w-20 h-20 bg-indigo-100 rounded-full animate-ping opacity-60'></div>
                    <div className='absolute w-14 h-14 bg-indigo-200 rounded-full animate-pulse'></div>
                    <div className='w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center z-10 shadow-lg'>
                        <i className='ri-car-fill text-white text-xl'></i>
                    </div>
                </div>
                <h3 className='text-lg font-bold text-slate-800'>Searching for a driver...</h3>
                <p className='text-sm text-slate-400 mt-1'>This usually takes 30–60 seconds</p>
            </div>

            <div className='bg-slate-50 rounded-2xl overflow-hidden'>
                <div className='flex items-center gap-4 p-3.5 border-b border-slate-100'>
                    <div className='w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>Pickup</p>
                        <p className='text-sm font-semibold text-slate-700'>{props.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-3.5 border-b border-slate-100'>
                    <div className='w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>Destination</p>
                        <p className='text-sm font-semibold text-slate-700'>{props.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-3.5'>
                    <div className='w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <i className="ri-currency-line text-indigo-600 text-sm"></i>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>Fare</p>
                        <p className='text-base font-bold text-indigo-600'>৳{props.fare[ props.vehicleType ]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver
