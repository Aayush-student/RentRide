import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/Appcontext'

const OwnerNavbar = () => {


   const {user} =  useContext(AppContext)
  return (
     
    <div className='flex justify-between items-center h-16 px-4 sm:px-10 bg-white border-b border-slate-100 shadow-sm'>
      
      <Link to='/'>
        <img className='w-28' src={assets.bikelogo} alt="" />
      </Link>

      <p className='text-slate-800 font-bold'>
        Welcome, {user?.username || "Owner"}
      </p>

    </div>
  )
}

export default OwnerNavbar