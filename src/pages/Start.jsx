import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen w-full relative overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop)" }}
      />
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80' />
      <div className='relative z-10 h-full flex flex-col justify-between px-6 pt-14 pb-10'>
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
            <i className='ri-car-fill text-white text-lg'></i>
          </div>
          <span className='font-bold text-2xl text-white tracking-tight'>RideShare</span>
        </div>
        <div>
          <h1 className='text-4xl font-extrabold text-white leading-tight mb-2'>
            Your ride,<br />your way.
          </h1>
          <p className='text-white/70 text-base mb-8'>Fast, safe, and affordable rides at your fingertips.</p>
          <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl'>
            <h2 className='text-xl font-bold text-white mb-1'>Get Started</h2>
            <p className='text-white/60 text-sm mb-5'>Choose how you want to continue</p>
            <Link
              to='/login'
              className='flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl mb-3 transition-colors shadow-lg'
            >
              <i className='ri-user-fill'></i>
              Continue as Rider
            </Link>
            <Link
              to='/captain-login'
              className='flex items-center justify-center gap-2 w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 rounded-xl transition-colors'
            >
              <i className='ri-steering-2-fill'></i>
              Continue as Captain
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
