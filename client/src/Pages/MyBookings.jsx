import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import BookingCard from '../components/BookingCard'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const MyBookings = () => {
  const { accessToken, axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookings = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }
    
    try {
      const { data } = await axios.get('/api/bookings/user', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [accessToken]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <div className='w-12 h-12 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin'></div>
      </div>
    );
  }

  const totalBookings = bookings?.length || 0;

  return (
    <div className="bg-slate-50 min-h-screen font-['Outfit']">
      <div className='h-24 md:h-32'></div>

      <main className='max-w-[1400px] mx-auto px-6 pb-24'>
        
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16'
        >
          <div>
            <div className='flex items-center gap-3 mb-4'>
               <span className='h-px w-8 bg-blue-900'></span>
               <p className='text-[10px] font-black uppercase tracking-[0.3em] text-blue-900'>Your Travel Log</p>
            </div>
            <h1 className='text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8]'>
              My <br /> <span className='text-transparent' style={{ WebkitTextStroke: '1px #0f172a' }}>Bookings</span>
            </h1>
            <p className='text-slate-500 font-medium mt-6 max-w-sm leading-relaxed'>
              Manage your premium fleet reservations. Currently tracking 
              <span className="text-slate-900 font-bold italic"> {totalBookings} active trips</span>.
            </p>
          </div>

          <div className='flex gap-10 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white'>
            <div className='text-center'>
              <p className='text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2'>Total Trips</p>
              <p className='text-4xl font-black text-slate-900 leading-none'>
                {String(totalBookings).padStart(2, '0')}
              </p>
            </div>
            <div className='w-px h-10 bg-slate-100 self-center'></div>
            <div className='text-center'>
              <p className='text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2'>Status</p>
              <p className='text-[10px] font-bold bg-blue-50 text-blue-900 px-3 py-1 rounded-full uppercase'>Active</p>
            </div>
          </div>
        </motion.header>

        <div className='w-full'>
          {bookings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner'
            >
              <p className='text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-4'>No reservations found</p>
              <Link 
                to='/bikes' 
                className='px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-all'
              >
                Find your ride
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'
            >
              <AnimatePresence mode='popLayout'>
                {bookings.map((item, index) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BookingCard data={item} refresh={fetchUserBookings} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MyBookings