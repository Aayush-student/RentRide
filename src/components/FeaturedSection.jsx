import React from 'react'
import { assets, dummyBikeData } from '../assets/assets' 
import BikeCard from './BikeCard' 
import { Link } from 'react-router-dom'

const FeaturedSection = () => {
  return (
    <div className="w-full py-20 bg-white font-['Outfit']">
        <div className='max-w-[1080px] mx-auto px-6 flex flex-col items-center'>
            
            
            <div className='mb-16 text-center flex flex-col items-center'>
                <h1 className='text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-900'>
                   Featured Vehicles 
                </h1>
                
                <p className='text-slate-500 font-medium text-lg max-w-2xl leading-relaxed'>
                   Explore our fleet of reliable bikes and scooties for your next trip. Beat the traffic and explore the city with total freedom.
                </p>
                
                <div className='w-20 h-1.5 bg-blue-900 rounded-full mt-6 opacity-20'></div>
            </div>

            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full'>
                {dummyBikeData.slice(0, 6).map((bikeData) => {
                    return <BikeCard key={bikeData._id} bikeData={bikeData} />
                })}
            </div>
             
           
            <div className='mt-16'>
                <Link 
                    to="/bikes" 
                    className='group flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1'
                >
                    <button className='font-bold text-sm uppercase tracking-widest cursor-pointer'>
                        View All Rides
                    </button>
                    
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