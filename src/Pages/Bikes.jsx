import React, { useEffect, useState } from 'react'
import { assets, dummyBikeData } from '../assets/assets' 
import BikeCard from '../components/BikeCard'
import Footer from '../components/Footer'

const Bikes = () => {
  
  const [search, setSearch] = useState('')
  
  const [filteredBikes, setFilteredBikes] = useState(dummyBikeData) 

  function searchHandler(event){
    setSearch(event.target.value.toLowerCase());
  }
  
  useEffect(()=>{
   
   const result = dummyBikeData.filter((bike)=> {
    return (
      bike.brand.toLowerCase().includes(search) ||
      bike.model.toLowerCase().includes(search) ||
      bike.category.toLowerCase().includes(search)
    )
   })
   setFilteredBikes(result);  
  },[search])

  return (
    <div className="bg-slate-50/50 min-h-screen font-['Outfit']">
      <main className='max-w-[1280px] mx-auto px-6 py-24 mt-10'>
        
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase'>
            Available <span className='text-blue-900'>Bikes</span> 
          </h1>
          <p className='text-slate-500 font-medium mt-3 max-w-lg mx-auto'>
            Browse our selection of premium vehicles available for your next adventure.
          </p>
        </header>

        <div className='max-w-3xl mx-auto mb-16'>
          <div className='flex items-center bg-white border border-slate-200 rounded-[2rem] p-2 shadow-xl shadow-blue-900/5 focus-within:border-blue-900 transition-all'>
            <div className='pl-4 pr-2'>
              <img src={assets.search_icon} className='w-5 h-5 opacity-40' alt="search" />
            </div>
            
            <input 
              type='text' 
              placeholder='Search by make, model, or features...'
              onChange={searchHandler}
              className='flex-1 bg-transparent border-none outline-none py-3 text-sm font-medium text-slate-700 placeholder-slate-400'
            />

            <button className='flex items-center justify-center bg-slate-50 hover:bg-blue-50 p-3 rounded-full transition-colors group'>
              <img src={assets.filter_icon} className='w-5 h-5 opacity-50 group-hover:opacity-100 transition-all' alt="filter" />
            </button>
          </div>
        </div>

        <section>
          <div className='flex items-center justify-between mb-8 px-2'>
            <h4 className='text-xs font-black uppercase tracking-[0.2em] text-slate-400'>
             
              Showing {filteredBikes.length} Bikes 
            </h4>
            <div className='h-px flex-1 bg-slate-100 ml-6'></div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredBikes.map((bikeData) => (
              <BikeCard key={bikeData._id} bikeData={bikeData} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Bikes