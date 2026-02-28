import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { dummyMyBookingsData } from '../../assets/assets'

const ManageBookings = () => {

  const [bookings, setBookings] = useState([])
  const currency = import.meta.env.VITE_CURRENCY || '$';

  useEffect(() => {
    setBookings(dummyMyBookingsData)
  }, [])

  return (
    <div className='w-full min-h-screen bg-slate-50 px-4 pt-10 md:px-10'>
      <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses." />

      <div className='mt-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Bike Details</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Date Range</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Total Price</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Status</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100'>
              {bookings.map((book) => {
                return (
                  <tr key={book._id} className='hover:bg-slate-50 transition-colors'>
                    <td className='p-4 align-middle'>
                      <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200'>
                          <img src={book.bike.image} alt="" className='w-full h-full object-cover' />
                        </div>
                        <div>
                          <h1 className='text-sm font-bold text-slate-800'>{book.bike.brand} {book.bike.model}</h1>
                          <p className='text-xs text-slate-500'>ID: {book._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>

                    <td className='p-4 align-middle'>
                      <div className='flex flex-col text-sm text-slate-600'>
                        <span className='font-medium'>{book.pickupDate.split('T')[0]}</span>
                        <span className='text-xs text-slate-400'>to</span>
                        <span className='font-medium'>{book.returnDate.split('T')[0]}</span>
                      </div>
                    </td>

                    <td className='p-4 align-middle text-sm font-bold text-slate-800'>
                      {currency}{book.price}
                    </td>

                    <td className='p-4 align-middle'>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide border
                        ${book.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                        ${book.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
                        ${book.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                      `}>
                        {book.status}
                      </span>
                    </td>

                    <td className='p-4 align-middle'>
                      <select className='bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2 outline-none cursor-pointer hover:border-slate-400 transition-colors'>
                        <option value="confirmed">Confirm</option>
                        <option value="cancelled">Cancel</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageBookings