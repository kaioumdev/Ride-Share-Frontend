import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => props.setVehiclePanel(false)}>
                <i className="text-3xl text-slate-300 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-xl font-bold text-slate-800 mb-4'>Choose a Vehicle</h3>

            {/* Car */}
            <div
                onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle('car') }}
                className='flex items-center border-2 border-transparent hover:border-indigo-300 active:border-indigo-500 mb-3 rounded-2xl w-full p-3.5 bg-slate-50 cursor-pointer transition-all'
            >
                <div className='w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                    <i className='ri-car-fill text-indigo-600 text-2xl'></i>
                </div>
                <div className='ml-3 flex-1'>
                    <div className='flex items-center gap-2'>
                        <h4 className='font-bold text-slate-800 text-sm'>RideGo</h4>
                        <span className='flex items-center gap-0.5 text-xs text-slate-500'><i className="ri-user-3-fill text-xs"></i> 4</span>
                    </div>
                    <p className='text-xs text-slate-400 mt-0.5'>2 mins away · Compact rides</p>
                </div>
                <div className='text-right'>
                    <h2 className='text-base font-bold text-indigo-600'>৳{props.fare.car}</h2>
                    <p className='text-xs text-slate-400'>Cash</p>
                </div>
            </div>

            {/* Moto */}
            <div
                onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle('moto') }}
                className='flex items-center border-2 border-transparent hover:border-indigo-300 active:border-indigo-500 mb-3 rounded-2xl w-full p-3.5 bg-slate-50 cursor-pointer transition-all'
            >
                <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                    <i className='ri-motorbike-fill text-orange-500 text-2xl'></i>
                </div>
                <div className='ml-3 flex-1'>
                    <div className='flex items-center gap-2'>
                        <h4 className='font-bold text-slate-800 text-sm'>RideMoto</h4>
                        <span className='flex items-center gap-0.5 text-xs text-slate-500'><i className="ri-user-3-fill text-xs"></i> 1</span>
                    </div>
                    <p className='text-xs text-slate-400 mt-0.5'>3 mins away · Fast &amp; affordable</p>
                </div>
                <div className='text-right'>
                    <h2 className='text-base font-bold text-indigo-600'>৳{props.fare.moto}</h2>
                    <p className='text-xs text-slate-400'>Cash</p>
                </div>
            </div>

            {/* Auto */}
            <div
                onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle('auto') }}
                className='flex items-center border-2 border-transparent hover:border-indigo-300 active:border-indigo-500 rounded-2xl w-full p-3.5 bg-slate-50 cursor-pointer transition-all'
            >
                <div className='w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                    <i className='ri-taxi-fill text-yellow-600 text-2xl'></i>
                </div>
                <div className='ml-3 flex-1'>
                    <div className='flex items-center gap-2'>
                        <h4 className='font-bold text-slate-800 text-sm'>RideAuto</h4>
                        <span className='flex items-center gap-0.5 text-xs text-slate-500'><i className="ri-user-3-fill text-xs"></i> 3</span>
                    </div>
                    <p className='text-xs text-slate-400 mt-0.5'>3 mins away · Budget-friendly</p>
                </div>
                <div className='text-right'>
                    <h2 className='text-base font-bold text-indigo-600'>৳{props.fare.auto}</h2>
                    <p className='text-xs text-slate-400'>Cash</p>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel
