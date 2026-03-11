import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets' 
import BikeCard from '../components/BikeCard'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'

const Bikes = () => {
  const { bikes, axios } = useContext(AppContext)
  const [searchParams] = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [availableBikes, setAvailableBikes] = useState([])
  const [filteredBikes, setFilteredBikes] = useState([]) 

  const location = searchParams.get('location')
  const pickUpDate = searchParams.get('pickUpDate')
  const returnDate = searchParams.get('returnDate')

  useEffect(() => {
    const fetchBikes = async () => {
      if (!bikes || bikes.length === 0) return;

      if (location && pickUpDate && returnDate) {
        try {
          const { data } = await axios.post('/api/bookings/check-availability', {
            location, pickUpDate, returnDate
          })
          if (data.success) {
            setAvailableBikes(data.data)
          }
        } catch (error) {
          setAvailableBikes(bikes)
        }
      } else if (location) {
        const results = bikes.filter(bike => bike.location === location)
        setAvailableBikes(results)
      } else {
        setAvailableBikes(bikes) 
      }
    }
    fetchBikes()
  }, [location, bikes, pickUpDate, returnDate])

  useEffect(() => {
    const results = availableBikes.filter((bike) => 
      bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBikes(results)
  }, [searchTerm, availableBikes])

  if (!bikes || bikes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <main className='max-w-[1280px] mx-auto px-6 pt-32 pb-24'>
        
        <div className='max-w-3xl mx-auto mb-16'>
          <div className='flex items-center bg-white border border-slate-200 rounded-full p-2 shadow-xl shadow-blue-900/5 focus-within:border-blue-900 transition-all'>
            <div className='pl-4 pr-2'>
              <img src={assets.search_icon} className='w-5 h-5 opacity-40' alt="search" />
            </div>
            
            <input 
              type='text' 
              placeholder='Search by make, model, or features...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='flex-1 bg-transparent border-none outline-none py-3 text-sm font-medium text-slate-700'
            />
          </div>
        </div>

        <section>
          <div className='flex items-center justify-between mb-8 px-2'>
            <h4 className='text-xs font-black uppercase tracking-[0.2em] text-slate-400'>
              {location ? `Available in ${location}` : 'All Rides'} • {filteredBikes.length} Units
            </h4>
            <div className='h-px flex-1 bg-slate-100 ml-6'></div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredBikes.map((item) => (
              <BikeCard key={item._id} bike={item} />
            ))}
          </div>

          {filteredBikes.length === 0 && (
             <div className='text-center py-20 text-slate-400'>
               No bikes found matching your criteria.
             </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Bikes