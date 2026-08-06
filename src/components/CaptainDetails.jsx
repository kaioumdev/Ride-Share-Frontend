import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)

    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <div className='flex items-center gap-3'>
                    <img
                        className='w-12 h-12 rounded-full object-cover border-2 border-indigo-200'
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                        alt="captain"
                    />
                    <div>
                        <h4 className='text-base font-bold text-slate-800 capitalize'>
                            {captain.fullname.firstname + " " + captain.fullname.lastname}
                        </h4>
                        <p className='text-xs text-slate-400'>Captain</p>
                    </div>
                </div>
                <div className='text-right bg-indigo-50 rounded-xl px-4 py-2'>
                    <h4 className='text-lg font-extrabold text-indigo-600'>৳295.20</h4>
                    <p className='text-xs text-slate-400'>Today's earnings</p>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-3'>
                <div className='bg-slate-50 rounded-2xl p-3 text-center'>
                    <div className='w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2'>
                        <i className="ri-timer-2-line text-blue-600 text-lg"></i>
                    </div>
                    <h5 className='text-base font-bold text-slate-800'>10.2</h5>
                    <p className='text-xs text-slate-400 mt-0.5'>Hours Online</p>
                </div>
                <div className='bg-slate-50 rounded-2xl p-3 text-center'>
                    <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2'>
                        <i className="ri-speed-up-line text-purple-600 text-lg"></i>
                    </div>
                    <h5 className='text-base font-bold text-slate-800'>10.2</h5>
                    <p className='text-xs text-slate-400 mt-0.5'>Km Driven</p>
                </div>
                <div className='bg-slate-50 rounded-2xl p-3 text-center'>
                    <div className='w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2'>
                        <i className="ri-booklet-line text-green-600 text-lg"></i>
                    </div>
                    <h5 className='text-base font-bold text-slate-800'>10.2</h5>
                    <p className='text-xs text-slate-400 mt-0.5'>Rides Done</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
