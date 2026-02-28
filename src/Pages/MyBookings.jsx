import React, { useState } from 'react'
import BookingCard from '../components/BookingCard'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MyBookings = ({ bookingData, setBookingData }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const totalBookings = bookingData.length;
  
  const totalSpent = bookingData.reduce((acc, curr) => {
    const start = new Date(curr.pickupDate);
    const end = new Date(curr.returnDate);
    const days = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) || 1;
    return acc + (days * curr.pricePerDay);
  }, 0);

  return (
    <div className="bg-slate-50 min-h-screen font-['Outfit']">
      <main className='max-w-[1600px] mx-auto px-4 md:px-8 py-20'>
        
        <header className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8'>
          <div>
            <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase'>
              Dashboard
            </h1>
            <p className='text-slate-500 font-medium mt-2 max-w-md'>
              Welcome back. You have <span className="font-bold text-slate-900">{totalBookings} active reservations</span> at the moment.
            </p>
          </div>

          <div className='flex gap-6 md:gap-12'>
            <div>
              <p className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1'>Total Bookings</p>
              <p className='text-3xl font-black text-slate-900 leading-none'>{String(totalBookings).padStart(2, '0')}</p>
            </div>
            <div>
              <p className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1'>Estimated Spend</p>
              <p className='text-3xl font-black text-slate-900 leading-none'>₹{totalSpent.toLocaleString()}</p>
            </div>
            <div className='hidden sm:block'>
              <p className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1'>Member Status</p>
              <p className='text-xl font-black text-blue-900 uppercase leading-none mt-1'>Platinum</p>
            </div>
          </div>
        </header>

        <div className='flex items-center gap-6 mb-8 overflow-x-auto pb-2'>
            {['upcoming', 'completed', 'cancelled'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                        : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-400'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {bookingData.length > 0 ? (
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 items-start'>
            {bookingData.map((data) => (
              <div key={data.bookingId || data._id} className='w-full'>
                 <BookingCard 
                    data={data} 
                    setBookingData={setBookingData} 
                  />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center min-h-[400px] bg-white border border-slate-200 rounded-[3rem] border-dashed'>
            <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4'>
                <img src={assets.search_icon} className='w-6 opacity-20' alt="empty" />
            </div>
            <h2 className='text-xl font-bold text-slate-900'>No active reservations</h2>
            <p className='text-slate-400 text-sm mt-2 mb-6'>Your garage is currently empty.</p>
            <Link 
              to='/bikes'
              className='bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20'
            >
              Reserve a Ride
            </Link>
          </div>
        )}

      </main>
    </div>
  )
}

export default MyBookings