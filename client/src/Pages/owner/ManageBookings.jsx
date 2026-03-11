import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { AppContext } from '../../context/Appcontext'
import { toast } from 'react-toastify'

const ManageBookings = () => {
  const [bookings, setBookings] = useState([])
  const { currency, accessToken, axios } = useContext(AppContext)

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      if (data.success) {
        setBookings(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings")
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status',
        { bookingId, status },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed")
    }
  }

  useEffect(() => {
    if (accessToken) {
      fetchOwnerBookings()
    }
  }, [accessToken])

  return (
    <div className='w-full min-h-screen bg-slate-50 px-4 pt-10 md:px-10'>
      <Title 
        title="Manage Bookings" 
        subTitle="Control customer reservations. Approve requests to confirm rides or cancel them if maintenance is required." 
      />

      <div className='mt-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Vehicle & ID</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Rental Period</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Total Earnings</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Current Status</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center'>Modify Status</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100'>
              {bookings.map((book) => (
                <tr key={book._id} className='hover:bg-slate-50 transition-colors'>
                  <td className='p-4 align-middle'>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200'>
                        <img src={book.bike?.image || ''} alt="" className='w-full h-full object-cover' />
                      </div>
                      <div>
                        <h1 className='text-sm font-bold text-slate-800'>
                          {book.bike ? `${book.bike.brand} ${book.bike.model}` : 'Deleted Vehicle'}
                        </h1>
                        <p className='text-[10px] font-mono text-slate-400 mt-0.5'>#{book._id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>

                  <td className='p-4 align-middle'>
                    <div className='flex flex-col text-sm text-slate-600'>
                      <span className='font-semibold'>{book.pickUpDate?.split('T')[0]}</span>
                      <span className='text-[10px] text-slate-400 uppercase font-bold tracking-tighter'>to</span>
                      <span className='font-semibold'>{book.returnDate?.split('T')[0]}</span>
                    </div>
                  </td>

                  <td className='p-4 align-middle text-sm font-black text-slate-900'>
                    {currency}{book.price?.toLocaleString()}
                  </td>

                  <td className='p-4 align-middle'>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                      ${book.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                      ${book.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
                      ${book.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        book.status === 'confirmed' ? 'bg-emerald-500' : 
                        book.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></span>
                      {book.status}
                    </span>
                  </td>

                  <td className='p-4 align-middle'>
                    <select 
                      value={book.status} 
                      onChange={(e) => changeBookingStatus(book._id, e.target.value)} 
                      className='bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl focus:ring-2 focus:ring-blue-900 block w-full p-2.5 outline-none cursor-pointer hover:border-blue-900 transition-all shadow-sm'
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {bookings.length === 0 && (
            <div className='p-24 text-center'>
              <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <p className='text-2xl'>📂</p>
              </div>
              <p className='text-slate-400 font-bold uppercase tracking-widest text-xs'>No reservation requests yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageBookings