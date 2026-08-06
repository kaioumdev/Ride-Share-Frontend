import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='px-6 pt-12 pb-6'>
        <div className='flex items-center gap-2 mb-8'>
          <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <i className='ri-car-fill text-white text-sm'></i>
          </div>
          <span className='font-bold text-xl text-slate-800'>RideShare</span>
        </div>
        <h1 className='text-3xl font-extrabold text-slate-800 leading-tight'>Welcome back</h1>
        <p className='text-slate-500 mt-1 text-sm'>Sign in to your rider account</p>
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
              placeholder='email@example.com'
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
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl mt-2 transition-colors shadow-lg shadow-indigo-200'
          >
            Sign In
          </button>
        </form>
        <p className='text-center mt-5 text-slate-500 text-sm'>
          New here?{' '}
          <Link to='/signup' className='text-indigo-600 font-semibold hover:underline'>Create an account</Link>
        </p>
      </div>

      <div className='px-6 pb-10 mt-8'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='flex-1 h-px bg-slate-200' />
          <span className='text-slate-400 text-xs font-medium'>OR</span>
          <div className='flex-1 h-px bg-slate-200' />
        </div>
        <Link
          to='/captain-login'
          className='flex items-center justify-center gap-2 w-full border-2 border-slate-200 hover:border-indigo-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors'
        >
          <i className='ri-steering-2-fill text-indigo-600'></i>
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
