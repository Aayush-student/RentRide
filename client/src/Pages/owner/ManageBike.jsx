import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/Appcontext'
import { toast } from 'react-toastify'

const ManageBike = () => {
  const [bikes, setbikes] = useState([])
  const { currency, axios, isOwner, accessToken } = useContext(AppContext)

  const fetchOwnerBikes = async () => {
    try {
      const { data } = await axios.get('/api/owner/bikes', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      if (data.success) {
        setbikes(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch bikes")
    }
  }

  const toggleAvailability = async (bikeId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-bike', { bikeId }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      if (data.success) {
        toast.success("Availability updated")
        fetchOwnerBikes()
      }
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  const deleteBike = async (bikeId) => {
    try {
      if (!window.confirm('Permanently remove this bike from the platform?')) return

      const { data } = await axios.delete('/api/owner/delete-bike', {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { bikeId: bikeId }
      })

      if (data.success) {
        toast.success("Bike removed successfully")
        fetchOwnerBikes()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete bike")
    }
  }

  useEffect(() => {
    if (isOwner && accessToken) {
      fetchOwnerBikes()
    }
  }, [isOwner, accessToken])

  return (
    <div className='px-4 pt-10 md:px-10 w-full min-h-screen bg-slate-50'>
      <Title title="Manage Bikes" subTitle="Control your fleet's visibility and inventory status" />

      <div className='mt-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Bike Details</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider max-md:hidden'>Category</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Price / Day</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider max-md:hidden'>Status</th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100'>
              {bikes.map((bike, index) => (
                <tr key={index} className='hover:bg-slate-50/80 transition-colors'>
                  <td className='p-4 align-middle'>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200'>
                        <img src={bike.image} alt="" className='w-full h-full object-cover' />
                      </div>
                      <div>
                        <p className='text-sm font-semibold text-slate-800'>{bike.brand} {bike.model}</p>
                        <p className='text-xs text-slate-500 mt-0.5'>
                          {bike.transmission} • {bike.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className='p-4 text-sm text-slate-600 font-medium max-md:hidden align-middle'>
                    {bike.category}
                  </td>

                  <td className='p-4 text-sm font-bold text-slate-800 align-middle'>
                    {currency}{bike.pricePerDay}
                  </td>

                  <td className='p-4 max-md:hidden align-middle'>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${bike.isAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}
                    `}>
                      {bike.isAvailable ? "Live" : "Hidden"}
                    </span>
                  </td>

                  <td className='p-4 align-middle'>
                    <div className='flex items-center justify-center gap-2'>
                      <button onClick={() => toggleAvailability(bike._id)} className='p-2 hover:bg-slate-100 rounded-lg transition-all'>
                        <img src={bike.isAvailable ? assets.eye_icon : assets.eye_close_icon} className='w-5 h-5 opacity-70' alt="Toggle" />
                      </button>
                      <button onClick={() => deleteBike(bike._id)} className='p-2 hover:bg-red-50 rounded-lg transition-all'>
                        <img src={assets.delete_icon} className='w-5 h-5 opacity-70' alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bikes.length === 0 && (
          <div className='p-20 text-center text-slate-400'>
            <p className='text-sm font-medium'>Your inventory is empty. Start by adding a bike.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageBike