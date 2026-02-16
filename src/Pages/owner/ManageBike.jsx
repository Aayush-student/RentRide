import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { assets, dummyBikeData } from '../../assets/assets'

const ManageBike = () => {

  const [bikes, setbikes] = useState([])
  const currency = import.meta.env.VITE_CURRENCY || '$';
  
  useEffect(() => {
    setbikes(dummyBikeData);
  }, []);

  return (
    <div className='px-4 pt-10 md:px-10 w-full min-h-screen bg-slate-50'>
      
      <Title title="Manage Bikes" subTitle="View all listed bikes, update their details, or remove them from the platform" />

      <div className='mt-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden'>
        
        
        <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
            
            
            <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Bike Details</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider max-md:hidden'>Category</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Price / Day</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider max-md:hidden'>Status</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center'>Actions</th>
                </tr>
            </thead>

           
            <tbody className='divide-y divide-slate-100'>
                {bikes.map((bike, index) => {
                return (
                    <tr key={index} className='hover:bg-slate-50/80 transition-colors group'>
                    
                   
                    <td className='p-4 align-middle'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200'>
                                <img src={bike.image} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-slate-800'>{bike.brand} {bike.model}</p>
                                <p className='text-xs text-slate-500 mt-0.5 flex items-center gap-2'>
                                    <span>{bike.seating_capacity} Seats</span>
                                    <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                                    <span>{bike.transmission}</span>
                                </p>
                            </div>
                        </div>
                    </td>

                   
                    <td className='p-4 text-sm text-slate-600 font-medium max-md:hidden align-middle'>
                        {bike.category}
                    </td>

                    
                    <td className='p-4 text-sm font-bold text-slate-800 align-middle'>
                        {currency}{bike.pricePerDay}
                    </td>

                   
                    <td className='p-4 max-md:hidden align-middle'>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                            ${bike.isAvailable 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }
                        `}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${bike.isAvailable ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            {bike.isAvailable ? "Available" : "Unavailable"}
                        </span>
                    </td>

                   
                    <td className='p-4 align-middle'>
                        <div className='flex items-center justify-center gap-3'>
                            <button className='p-2 hover:bg-blue-50 rounded-full transition-colors group/btn' title="Toggle Availability">
                                <img 
                                    src={bike.isAvailable ? assets.eye_icon : assets.eye_close_icon} 
                                    className='w-10 h-10 opacity-60 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all' 
                                    alt="Visibility"
                                />
                            </button>
                            
                            <button className='p-2 hover:bg-red-50 rounded-full transition-colors group/btn' title="Delete Bike">
                                <img 
                                    src={assets.delete_icon} 
                                    className='w-10 h-10 opacity-60 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all' 
                                    alt="Delete" 
                                />
                            </button>
                        </div>
                    </td>

                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>
        
       
        {bikes.length === 0 && (
            <div className='p-12 text-center text-slate-400'>
                <p>No bikes found.</p>
            </div>
        )}

      </div>
    </div>
  )
}

export default ManageBike