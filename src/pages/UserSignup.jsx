import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({})

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message)
    }
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='px-6 pt-12 pb-4'>
        <div className='flex items-center gap-2 mb-6'>
          <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <i className='ri-car-fill text-white text-sm'></i>
          </div>
          <span className='font-bold text-xl text-slate-800'>RideShare</span>
        </div>
        <h1 className='text-3xl font-extrabold text-slate-800 leading-tight'>Create account</h1>
        <p className='text-slate-500 mt-1 text-sm'>Join RideShare and start your journey</p>
      </div>

      <div className='flex-1 px-6 pb-6'>
        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Full name</label>
            <div className='flex gap-3'>
              <input
                required
                className='bg-slate-100 rounded-xl px-4 py-3 w-1/2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className='bg-slate-100 rounded-xl px-4 py-3 w-1/2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
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
              placeholder='Create a password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200'
          >
            Create Account
          </button>
        </form>
        <p className='text-center mt-5 text-slate-500 text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='text-indigo-600 font-semibold hover:underline'>Sign in</Link>
        </p>
        <p className='text-center text-slate-400 text-xs mt-6 leading-relaxed'>
          By creating an account, you agree to our{' '}
          <span className='underline'>Terms of Service</span> and{' '}
          <span className='underline'>Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
