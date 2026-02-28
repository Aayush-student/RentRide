import React from 'react'
import { assets } from '../assets/assets'

const BookingCard = ({ data }) => {
  
  const calculateTotal = (pickup, returnDate, price) => {
    const start = new Date(pickup);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return { 
      days: diffDays, 
      total: diffDays * price 
    };
  };

  const { days, total } = calculateTotal(data.pickupDate, data.returnDate, data.pricePerDay);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 group font-['Outfit']">

   
      <div className="w-full sm:w-48 h-40 bg-slate-50 rounded-2xl flex items-center justify-center p-2 relative shrink-0 border border-slate-50">
           <img 
              src={data.image} 
              alt={data.model} 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
           />
           <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-500 border border-slate-100">
              {data.year}
           </div>
      </div>

  
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">

       
          <div className="flex justify-between items-start mb-3 gap-2">
              <div className="min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 truncate pr-2">
                    {data.brand} {data.model}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    {data.category}
                  </span>
              </div>
              
              <span className="shrink-0 bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-100 uppercase tracking-wide">
                  Confirmed
              </span>
          </div>

         
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Dates</p>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 truncate">{data.pickupDate}</span>
                    <span className="text-[10px] text-slate-400 font-medium">to</span>
                    <span className="text-xs font-bold text-slate-700 truncate">{data.returnDate}</span>
                  </div>
              </div>
              
              <div className="min-w-0">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Pickup</p>
                   <p className="text-xs font-bold text-slate-700 line-clamp-2 leading-relaxed">
                      {data.location}
                   </p>
              </div>
          </div>

          
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between gap-4">
              <div>
                   <p className="text-[10px] text-slate-400 font-medium mb-0.5">Total Paid ({days} Days)</p>
                   <p className="text-xl font-black text-slate-900 leading-none">₹{total.toLocaleString()}</p>
              </div>
              
              <button className="bg-slate-900 hover:bg-blue-900 text-white px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors shadow-lg shadow-slate-900/10 shrink-0">
                  Receipt
              </button>
          </div>

      </div>

    </div>
  )
}

export default BookingCard