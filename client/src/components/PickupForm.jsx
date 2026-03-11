import React, { useState, useContext } from 'react'
import { assets, cityList } from '../assets/assets'
import { AppContext } from '../context/Appcontext'

const PickupForm = () => {
    const { navigate, setPickUpDate, setReturnDate } = useContext(AppContext)
    
    const [formData, setFormData] = useState({
        location: "",
        pickUpDate: "",
        returnDate: ""
    })

    const changeHandler = (event) => {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSearch = (event) => {
        event.preventDefault()
        
        setPickUpDate(formData.pickUpDate)
        setReturnDate(formData.returnDate)

        navigate(`/bikes?location=${formData.location}&pickUpDate=${formData.pickUpDate}&returnDate=${formData.returnDate}`)
    }

    return (
        <div className='w-full'>
            <form 
                onSubmit={handleSearch}
                className='flex flex-col md:flex-row items-center bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
            >
                <label className='flex flex-col flex-1 px-8 py-2 text-left hover:bg-slate-50 rounded-full transition-colors cursor-pointer group'>
                    <span className='text-[10px] uppercase font-bold text-blue-900 tracking-widest mb-0.5'>Location</span>
                    <select 
                        required 
                        name="location"
                        value={formData.location}
                        onChange={changeHandler}
                        className='bg-transparent outline-none text-[15px] text-slate-800 font-semibold cursor-pointer w-full appearance-none'
                    >
                        <option value="">Select City</option>
                        {cityList.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </label>

                <div className='hidden md:block w-px h-10 bg-slate-100 mx-2'></div>

                <label className='flex flex-col flex-1 px-8 py-2 text-left hover:bg-slate-50 rounded-full transition-colors cursor-pointer'>
                    <span className='text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-0.5'>Pick-up</span>
                    <input 
                        type='date'
                        required
                        name="pickUpDate"
                        value={formData.pickUpDate}
                        onChange={changeHandler}
                        className='bg-transparent outline-none text-[14px] text-slate-600 font-medium cursor-pointer w-full' 
                        min={new Date().toISOString().split('T')[0]}
                    />
                </label>

                <div className='hidden md:block w-px h-10 bg-slate-100 mx-2'></div>

                <label className='flex flex-col flex-1 px-8 py-2 text-left hover:bg-slate-50 rounded-full transition-colors cursor-pointer'>
                    <span className='text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-0.5'>Return</span>
                    <input 
                        type='date'
                        required
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={changeHandler}
                        className='bg-transparent outline-none text-[14px] text-slate-600 font-medium cursor-pointer w-full'
                        min={formData.pickUpDate || new Date().toISOString().split('T')[0]}
                    />
                </label>

                <button type='submit' className='flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white px-10 py-4 rounded-full transition-all active:scale-95 shadow-lg shadow-blue-900/20 ml-2'>
                    <img src={assets.search_icon} alt="search" className='w-4 h-4 brightness-0 invert' />
                    <span className='font-bold text-sm tracking-wide uppercase'>Search</span>
                </button>
            </form>

            <div className='mt-4 flex justify-center'>
                {!formData.location ? (
                    <p className='text-[12px] text-slate-400 font-medium tracking-tight'>
                        Choose your destination to see available premium rides
                    </p>
                ) : (
                    <p className='text-[12px] text-blue-900 font-bold uppercase tracking-widest animate-pulse'>
                        Available in {formData.location}
                    </p>
                )}
            </div>
        </div>
    )
}

export default PickupForm