import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets, cityList } from '../../assets/assets'

const AddBike = () => {
  
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const [image, setImage] = useState(null)
  
  const [bike, setBike] = useState({
     brand : '',
     model : '',
     year  : '',
     pricePerDay : '',
     category : '', 
     transmission : '',
     fuel_type : '',
     seating_capacity : '',
     location : '',
     description : '',
  })

  function changeHandler(event){
    setBike(prev => {
      return {
        ...prev, 
        [event.target.name] : event.target.value
      }
    })
  }

  function onSubmitHandler(e){
      e.preventDefault();
      console.log(bike);
  }

  const inputStyle = "w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all text-slate-600 text-sm";
  const labelStyle = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className='px-4 py-10 md:px-10 flex-1 min-h-screen bg-slate-50'>

      <Title 
        title="Add New Bike" 
        subTitle="Fill in details to list a new bike for booking, including pricing, availability, and bike specifications."
      />
      
      <form onSubmit={onSubmitHandler} className='mt-8 max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200'>
        
       
        <div className='mb-6'>
          <p className={labelStyle}>Upload a picture of your bike</p>
          <label htmlFor='bike-image' className='cursor-pointer flex flex-col items-center justify-center w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-100 transition-colors'>
            <img 
                src={image ? URL.createObjectURL(image) : assets.upload_icon} 
                alt='' 
                className={`object-cover ${image ? 'w-full h-full rounded-lg' : 'w-10 h-10 opacity-50'}`}
            />
            <input type='file' id='bike-image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])}/>
          </label>
        </div>

       
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
            <div>
                <label htmlFor='brand' className={labelStyle}>Brand</label>
                <input 
                    type='text' 
                    name='brand' 
                    id='brand' 
                    placeholder='e.g. Royal Enfield, Yamaha...' 
                    required 
                    value={bike.brand} 
                    onChange={changeHandler}
                    className={inputStyle}
                />
            </div>
            <div>
                <label htmlFor='model' className={labelStyle}>Model</label>
                <input 
                    type='text' 
                    name='model' 
                    id='model' 
                    placeholder='e.g. Classic 350, MT-15...' 
                    required 
                    value={bike.model} 
                    onChange={changeHandler}
                    className={inputStyle}
                />
            </div>
        </div>

        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
            <div>
                <label htmlFor='year' className={labelStyle}>Year</label>
                <input 
                    type='number' 
                    placeholder='2024' 
                    required 
                    name='year' 
                    id='year' 
                    value={bike.year} 
                    onChange={changeHandler}
                    className={inputStyle}
                />
            </div>
            <div>
                <label htmlFor='pricePerDay' className={labelStyle}>Daily Price ({currency})</label>
                <input 
                    type='number' 
                    placeholder='0' 
                    required 
                    name='pricePerDay' 
                    id='pricePerDay' 
                    value={bike.pricePerDay} 
                    onChange={changeHandler}
                    className={inputStyle}
                />
            </div>
        </div>

     
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4'>
            
           
            <div>
                <label htmlFor='category' className={labelStyle}>Category</label>
                <select required name='category' id='category' value={bike.category} onChange={changeHandler} className={inputStyle}>
                    <option value="">Select Category</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Sports">Sports</option>
                    <option value="Commuter">Commuter</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Off-Road">Off-Road</option>
                </select>
            </div>

            
            <div>
                <label htmlFor='transmission' className={labelStyle}>Transmission</label>
                <select required name='transmission' id='transmission' value={bike.transmission} onChange={changeHandler} className={inputStyle}>
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </div>

          
            <div>
                <label htmlFor='fuel_type' className={labelStyle}>Fuel Type</label>
                <select required name='fuel_type' id='fuel_type' value={bike.fuel_type} onChange={changeHandler} className={inputStyle}>
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                </select>
            </div>

           
            <div>
                <label htmlFor='seating_capacity' className={labelStyle}>Seating Capacity</label>
                <input 
                    type='number' 
                    placeholder='e.g. 2' 
                    required 
                    name='seating_capacity' 
                    id='seating_capacity' 
                    value={bike.seating_capacity} 
                    onChange={changeHandler}
                    className={inputStyle}
                />
            </div>
        </div>

       
        <div className='mb-4'>
             <label htmlFor='location' className={labelStyle}>Location</label>
             <select required name='location' id='location' value={bike.location} onChange={changeHandler} className={`${inputStyle} md:w-1/2`}>
                <option value="">Select Location</option>
                {cityList.map((city)=>(
                  <option value={city}>{city}</option>
                ))}
             </select>
        </div>

        
        <div className='mb-6'>
             <label htmlFor='description' className={labelStyle}>Description</label>
             <textarea 
                name='description' 
                id='description'
                placeholder='Enter a brief description of the bike...'
                rows="4"
                value={bike.description}
                onChange={changeHandler}
                className={`${inputStyle} resize-none`}
             ></textarea>
        </div>
        
        
        <button type='submit' className='bg-slate-900 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-md'>
            Add Bike
        </button>

      </form>
    </div>
  )
}

export default AddBike