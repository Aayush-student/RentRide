import React, { useContext } from 'react'
import { assets } from '../assets/assets' 
import BikeCard from './BikeCard' 
import { Link } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'

const FeaturedSection = () => {
    const { bikes } = useContext(AppContext)

    return (
        <div className="w-full py-24 bg-gradient-to-b from-white to-slate-50 font-['Outfit']">
            <div className='max-w-[1150px] mx-auto px-6 flex flex-col items-center'>
                
                <div className='mb-20 text-center flex flex-col items-center'>
                    <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 animate-[fadeIn_0.8s_ease-in-out]'>
                        Featured Vehicles 
                    </h1>
                    
                    <p className='text-slate-500 font-medium text-lg max-w-2xl leading-relaxed animate-[fadeIn_1.2s_ease-in-out]'>
                        Explore our fleet of reliable bikes and scooties for your next trip. Beat the traffic and explore the city with total freedom.
                    </p>
                    
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-900 to-indigo-600 rounded-full mt-6 opacity-30'></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full'>
                  
                    {bikes && bikes.length > 0 ? (
                        bikes.slice(0, 6).map((bikeData) => (
                            <div key={bikeData._id} className='transition-transform duration-300 hover:-translate-y-3 hover:scale-[1.02]'>
                                <BikeCard bike={bikeData} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-400 italic animate-pulse">
                            Loading Vehicles...
                        </div>
                    )}
                </div>
                 
                <div className='mt-20'>
                    <Link 
                        to="/bikes" 
                        className='group relative flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white px-10 py-4 rounded-full transition-all duration-300 shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 overflow-hidden'
                    >
                        <span className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300'></span>
                        
                        <span className='relative font-bold text-sm uppercase tracking-widest'>
                            View All Rides
                        </span>
                        
                        <img 
                            src={assets.arrow_icon} 
                            alt="arrow" 
                            className='relative w-4 h-4 brightness-0 invert transition-transform duration-300 group-hover:translate-x-2'
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FeaturedSection;