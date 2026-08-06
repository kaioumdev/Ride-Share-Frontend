import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email: email, password }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captain-token', data.token)
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='px-6 pt-12 pb-6'>
        <div className='flex items-center gap-2 mb-8'>
          <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <i className='ri-steering-2-fill text-white text-sm'></i>
          </div>
          <span className='font-bold text-xl text-slate-800'>RideShare</span>
        </div>
        <div className='inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full mb-4'>
          <i className='ri-shield-star-fill text-indigo-600 text-sm'></i>
          <span className='text-xs font-semibold text-indigo-700'>Captain Portal</span>
        </div>
        <h1 className='text-3xl font-extrabold text-slate-800 leading-tight'>Captain Sign In</h1>
        <p className='text-slate-500 mt-1 text-sm'>Access your captain dashboard</p>
      </div>

      <div className='flex-1 px-6'>
        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Email address</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-slate-100 rounded-xl px-4 py-3 w-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
              type="email"
              placeholder='captain@example.com'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-slate-100 rounded-xl px-4 py-3 w-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
              type="password"
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200'
          >
            Sign In as Captain
          </button>
        </form>
        <p className='text-center mt-5 text-slate-500 text-sm'>
          New captain?{' '}
          <Link to='/captain-signup' className='text-indigo-600 font-semibold hover:underline'>Register here</Link>
        </p>
      </div>

      <div className='px-6 pb-10 mt-8'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='flex-1 h-px bg-slate-200' />
          <span className='text-slate-400 text-xs font-medium'>OR</span>
          <div className='flex-1 h-px bg-slate-200' />
        </div>
        <Link
          to='/login'
          className='flex items-center justify-center gap-2 w-full border-2 border-slate-200 hover:border-indigo-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors'
        >
          <i className='ri-user-fill text-indigo-600'></i>
          Sign in as Rider
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin
