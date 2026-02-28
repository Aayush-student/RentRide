import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const BikeCard = ({ bikeData }) => {
    
    const navigate = useNavigate();

    function movetoDetails(id){
        navigate(`/bike-details/${id}`)
        window.scrollTo(0,0)
    }

    return (
        <div className='group bg-white rounded-2xl border border-slate-100 p-0 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
            
            <div className='relative h-52 w-full bg-slate-100 overflow-hidden'>
                <img 
                    src={bikeData.image} 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
                    alt={bikeData.model} 
                />

                {bikeData.isAvailable && (
                    <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm'>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className='text-[10px] font-bold text-slate-700 uppercase tracking-wider'>Available</span>
                    </div>
                )}

                <div className='absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg shadow-lg'>
                    <span className='font-bold text-sm'>₹{bikeData.pricePerDay}</span>
                    <span className='text-[10px] text-slate-300 font-medium ml-1'>/ Day</span>
                </div>
            </div>

            <div className='p-5'>
                <div className='mb-4'>
                    <h1 className='text-xl font-bold text-slate-900 leading-none'>{bikeData.brand} <span className='text-blue-900'>{bikeData.model}</span></h1>
                    <p className='text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-2'>{bikeData.category} • {bikeData.year}</p>
                </div>

                <hr className='border-slate-100 mb-4' />

                <div className='grid grid-cols-2 gap-y-3 gap-x-2'>
                    <div className='flex items-center gap-2'>
                        <img src={assets.users_icon} className='w-4 h-4 opacity-50' alt="" />
                        <span className='text-xs font-medium text-slate-600'>{bikeData.seating_capacity} Seats</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.fuel_icon} className='w-4 h-4 opacity-50' alt="" />
                        <span className='text-xs font-medium text-slate-600'>{bikeData.fuel_type}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.car_icon} className='w-4 h-4 opacity-50' alt="" />
                        <span className='text-xs font-medium text-slate-600'>{bikeData.transmission}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.location_icon} className='w-4 h-4 opacity-50' alt="" />
                        <span className='text-xs font-medium text-slate-600 truncate'>{bikeData.location}</span>
                    </div>
                </div>

                <button className='w-full mt-6 bg-gradient-to-r from-gray-900 to-blue-900 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer' onClick={()=> movetoDetails(bikeData._id)}>
                    View Details
                </button>
            </div>
        </div>
    )
}

export default BikeCard