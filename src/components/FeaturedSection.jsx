import React from 'react'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from './CarCard'
import { Link } from 'react-router-dom'

const FeaturedSection = () => {
  return (
    <div className='w-full py-20 bg-white'>
        <div className='max-w-[1080px] mx-auto px-6 flex flex-col items-center'>
            
            <div className='mb-16 text-center flex flex-col items-center'>
                <h1 className='text-4xl md:text-5xl font-extrabold tracking-tighter mb-4'>
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600'>
                        Featured Vehicles
                    </span>
                </h1>
                <p className='text-slate-500 font-medium text-lg max-w-2xl leading-relaxed'>
                    Explore our selection of premium vehicles available for your next adventure. 
                    Experience the road like never before.
                </p>
                <div className='w-20 h-1.5 bg-blue-600 rounded-full mt-6 opacity-20'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full'>
                {/* Showing first 6 cars to keep the grid balanced before the "Explore" button */}
                {dummyCarData.slice(0, 6).map((carData) => {
                    return <CarCard key={carData._id} carData={carData} />
                })}
            </div>
             
            <div className='mt-16'>
                <Link 
                    to="/cars" 
                    className='group flex items-center gap-3 bg-blue-600 hover:bg-blue-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-slate-200'
                >
                    <button className='font-bold text-sm uppercase tracking-widest'>Explore all Cars</button>
                    <img 
                        src={assets.arrow_icon} 
                        alt="arrow" 
                        className='w-4 h-4 brightness-0 invert transition-transform duration-300 group-hover:translate-x-2'
                    />
                </Link>
            </div>
           
        </div>
    </div>
  )
}

export default FeaturedSection;