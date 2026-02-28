import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { dummyUserData } from '../../assets/assets'

const OwnerNavbar = () => {
  return (
    // Changed 'justify-around' to 'justify-between' and added 'px-4 sm:px-10'
    <div className='flex justify-between items-center h-16 px-4 sm:px-10 bg-white border-b border-slate-100 shadow-sm'>
      
      <Link to='/'>
        <img className='w-28' src={assets.carlogo} alt="" />
      </Link>

      <p className='text-slate-800 font-bold'>
        Welcome, {dummyUserData.name || "Owner"}
      </p>

    </div>
  )
}

export default OwnerNavbar