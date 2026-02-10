import React from 'react'
import { assets } from '../assets/assets'

const CustomerCard = ({ Data }) => {
  return (
    <div className='bg-white/60 backdrop-blur-md border border-white/80 p-7 rounded-[2rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full'>
      
      <div className='flex items-center gap-4 mb-4'>
        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm'>
          <img src={Data.image} alt={Data.name} className='w-full h-full object-cover' />
        </div>
        
        <div className='flex flex-col'>
          <h1 className='text-lg font-bold text-slate-900 leading-tight'>{Data.name}</h1>
          <h2 className='text-xs font-semibold text-blue-600 uppercase tracking-wider'>{Data.location}</h2>
        </div>
      </div>

      <div className='flex gap-1 mb-4'>
        {[...Array(5)].map((_, i) => (
          <img key={i} src={assets.star_icon} alt="star" className='w-3.5 h-3.5' />
        ))}
      </div>

      <p className='text-slate-600 italic font-medium leading-relaxed text-sm'>
        "{Data.testimonial}"
      </p>
      
    </div>
  )
}

export default CustomerCard