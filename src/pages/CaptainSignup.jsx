import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: { color: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity, vehicleType: vehicleType }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captain-token', data.token)
      navigate('/captain-home')
    }
    setEmail(''); setFirstName(''); setLastName(''); setPassword('')
    setVehicleColor(''); setVehiclePlate(''); setVehicleCapacity(''); setVehicleType('')
  }

  const inputClass = 'bg-slate-100 rounded-xl px-4 py-3 w-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm'

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='px-6 pt-10 pb-4'>
        <div className='flex items-center gap-2 mb-5'>
          <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <i className='ri-steering-2-fill text-white text-sm'></i>
          </div>
          <span className='font-bold text-xl text-slate-800'>RideShare</span>
        </div>
        <h1 className='text-2xl font-extrabold text-slate-800'>Become a Captain</h1>
        <p className='text-slate-500 mt-1 text-sm'>Start earning with RideShare today</p>
      </div>

      <div className='flex-1 px-6 pb-6'>
        <form onSubmit={submitHandler} className='space-y-5'>
          {/* Personal Info */}
          <div className='bg-slate-50 rounded-2xl p-4'>
            <h3 className='text-sm font-bold text-slate-700 mb-3 flex items-center gap-2'>
              <i className='ri-user-line text-indigo-600'></i> Personal Info
            </h3>
            <div className='space-y-3'>
              <div className='flex gap-3'>
                <input required className={inputClass} type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input required className={inputClass} type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <input required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} type="email" placeholder='Email address' />
              <input required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} type="password" placeholder='Password' />
            </div>
          </div>

          {/* Vehicle Info */}
          <div className='bg-slate-50 rounded-2xl p-4'>
            <h3 className='text-sm font-bold text-slate-700 mb-3 flex items-center gap-2'>
              <i className='ri-car-line text-indigo-600'></i> Vehicle Info
            </h3>
            <div className='space-y-3'>
              <div className='flex gap-3'>
                <input required className={inputClass} type="text" placeholder='Vehicle color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
                <input required className={inputClass} type="text" placeholder='Plate number' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
              </div>
              <div className='flex gap-3'>
                <input required className={inputClass} type="number" placeholder='Capacity' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
                <select required className={inputClass} value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                  <option value="" disabled>Vehicle type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
            </div>
          </div>

          <button type='submit' className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200'>
            Create Captain Account
          </button>
        </form>
        <p className='text-center mt-4 text-slate-500 text-sm'>
          Already a captain?{' '}
          <Link to='/captain-login' className='text-indigo-600 font-semibold hover:underline'>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
