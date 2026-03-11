import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const BookingCard = ({ data }) => {
  if (!data) return null;

  const bikeInfo = data.bike || data;

  const calculateTotal = (pickup, returnDate, price) => {
    if (!pickup || !returnDate) return { days: 0, total: 0 };
    const start = new Date(pickup);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return { 
      days: diffDays, 
      total: diffDays * (price || 0) 
    };
  };

  const { days, total } = calculateTotal(data.pickUpDate, data.returnDate, bikeInfo.pricePerDay || data.price);

  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col w-full max-w-[350px] group font-['Outfit']"
    >
      <div className="w-full h-48 bg-slate-50 rounded-[2rem] flex items-center justify-center p-6 relative overflow-hidden border border-slate-50">
           <motion.img 
              whileHover={{ scale: 1.1 }}
              src={bikeInfo?.image || assets.placeholder_icon} 
              alt={bikeInfo?.model} 
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500" 
           />
           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 border border-slate-100 shadow-sm">
              {bikeInfo?.year || 'N/A'}
           </div>
           <div className={`absolute top-4 right-4 text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest shadow-sm ${
                data?.status === 'confirmed' 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-amber-400 text-white border-amber-400'
              }`}>
                  {data?.status || 'Pending'}
           </div>
      </div>

      <div className="mt-6 flex-1 flex flex-col">
          <div className="mb-4">
              <h3 className="text-xl font-black text-slate-900 truncate uppercase tracking-tighter">
                {bikeInfo?.brand} <span className="text-blue-900">{bikeInfo?.model}</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
                {bikeInfo?.category || 'Premium Rental'}
              </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-6">
              <div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-2">Duration</p>
                  <p className="text-xs font-bold text-slate-700">
                    {data?.pickUpDate ? new Date(data.pickUpDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'N/A'} 
                    <span className="text-slate-300 mx-1">-</span>
                    {data?.returnDate ? new Date(data.returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'N/A'}
                  </p>
              </div>
              <div className="text-right">
                   <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-2">Location</p>
                   <p className="text-xs font-bold text-slate-700 truncate">
                      {bikeInfo?.location || 'Main Hub'}
                   </p>
              </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
              <div>
                   <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Total ({days} Days)</p>
                   <p className="text-2xl font-black text-slate-900 tracking-tighter">₹{total.toLocaleString()}</p>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-900 transition-colors shadow-lg shadow-slate-900/20"
              >
                  <img src={assets.arrow_icon} className="w-4 h-4 brightness-200" alt="receipt" />
              </motion.button>
          </div>
      </div>
    </motion.div>
  )
}

export default BookingCard