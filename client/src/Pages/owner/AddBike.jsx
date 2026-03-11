import React, { useContext, useState } from 'react'
import Title from '../../components/owner/Title'
import { assets, cityList } from '../../assets/assets'
import { AppContext } from '../../context/Appcontext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const AddBike = () => {
  const { currency, axios, accessToken, user } = useContext(AppContext)
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [bike, setBike] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    location: '',
    description: '',
    seating_capacity: ''
  })

  function changeHandler(event) {
    setBike(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (isLoading) return
    setIsLoading(true)

    try {
      const formData = new FormData();
      formData.append('image', image)
      formData.append('bikeData', JSON.stringify(bike))

      const { data } = await axios.post('/api/owner/add-bike', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setBike({
          brand: '', model: '', year: '', pricePerDay: '', category: '',
          transmission: '', fuel_type: '', location: '', description: '', seating_capacity: ''
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add bike")
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = "w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all text-slate-600 text-sm bg-slate-50/50";
  const labelStyle = "block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1";

  if (user?.role !== 'owner') {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="font-bold text-slate-400 uppercase tracking-widest">Access Denied</p>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='px-4 py-10 md:px-10 flex-1 min-h-screen bg-slate-50'
    >
      <Title 
        title="Fleet Expansion" 
        subTitle="Register a new high-performance vehicle to the RentRide premium collection."
      />
      
      <form onSubmit={onSubmitHandler} className='mt-12 max-w-5xl bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white'>
        
        <div className='mb-10'>
          <p className={labelStyle}>Vehicle Preview</p>
          <label htmlFor='bike-image' className='group cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-blue-900 transition-all overflow-hidden'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt='' className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <img src={assets.upload_icon} alt='' className='w-8 h-8 opacity-20 mx-auto mb-2 group-hover:opacity-100 transition-opacity' />
                <p className="text-[9px] font-bold text-slate-400 uppercase">Upload Image</p>
              </div>
            )}
            <input type='file' id='bike-image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])}/>
          </label>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          <div>
            <label className={labelStyle}>Manufacturer / Brand</label>
            <input type='text' name='brand' placeholder='e.g. Royal Enfield, KTM...' required value={bike.brand} onChange={changeHandler} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Model Specification</label>
            <input type='text' name='model' placeholder='e.g. Himalayan, Duke 390...' required value={bike.model} onChange={changeHandler} className={inputStyle} />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <label className={labelStyle}>Manufacturing Year</label>
            <input type='number' name='year' placeholder='2026' required value={bike.year} onChange={changeHandler} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Daily Rental ({currency})</label>
            <input type='number' name='pricePerDay' placeholder='1500' required value={bike.pricePerDay} onChange={changeHandler} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Seating Capacity</label>
            <input type='number' name='seating_capacity' placeholder='e.g. 1 or 2' required value={bike.seating_capacity} onChange={changeHandler} className={inputStyle} />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <label className={labelStyle}>Category</label>
            <select name='category' value={bike.category} onChange={changeHandler} className={inputStyle} required>
              <option value="">Select</option>
              <option value="Superbike">Superbike</option>
              <option value="Cruiser">Cruiser</option>
              <option value="Adventure">Adventure</option>
              <option value="Scooter">Scooter</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Transmission</label>
            <select name='transmission' value={bike.transmission} onChange={changeHandler} className={inputStyle} required>
              <option value="">Select</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Fuel System</label>
            <select name='fuel_type' value={bike.fuel_type} onChange={changeHandler} className={inputStyle} required>
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          <div>
            <label className={labelStyle}>Available City</label>
            <select name='location' value={bike.location} onChange={changeHandler} className={inputStyle} required>
              <option value="">Select City</option>
              {cityList.map((city, index) => <option key={index} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className='mb-10'>
          <label className={labelStyle}>Vehicle Overview</label>
          <textarea name='description' rows="4" value={bike.description} onChange={changeHandler} className={`${inputStyle} resize-none`} placeholder="Highlight specs like engine CC, mileage, or special features..."></textarea>
        </div>
        
        <button 
          type='submit' 
          disabled={isLoading}
          className='w-full md:w-auto bg-slate-900 text-white px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 active:scale-95 disabled:opacity-50'
        >
          {isLoading ? 'Processing Fleet Data...' : 'Confirm Listing'}
        </button>
      </form>
    </motion.div>
  )
}

export default AddBike