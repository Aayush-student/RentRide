import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { AppContext } from '../../context/Appcontext'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { axios, currency, isOwner, accessToken } = useContext(AppContext)

  const [data, setData] = useState({
    totalBikes: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (data.success) {
        setData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
    }
  }

  useEffect(() => {
    if (isOwner && accessToken) {
      fetchDashboardData()
    }
  }, [isOwner, accessToken])

  const dashboardCards = [
    {
      title: "Total Bikes",
      value: data.totalBikes,
      icon: assets.carIconColored
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored
    }
  ]

  return (
    <div className='w-full min-h-screen p-6 bg-slate-50'>
      <Title 
        title='Admin Dashboard' 
        subTitle="Monitor overall platform performance including total bikes, bookings, revenue, and recent activities" 
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
        {dashboardCards.map((card, index) => (
          <div 
            key={index} 
            className='bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex items-center justify-between'
          >
            <div className='flex flex-col gap-1'>
              <h1 className='text-slate-500 text-xs font-bold uppercase tracking-wider'>
                {card.title}
              </h1>
              <p className='text-2xl font-bold text-slate-800'>
                {card.value}
              </p>
            </div>
            <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0'>
              <img src={card.icon} alt={card.title} className='w-5 h-5 object-contain' />
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
        <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
          <h1 className='text-lg font-bold text-slate-800 mb-1'>Recent Bookings</h1>
          <p className='text-sm text-slate-500 mb-6'>Latest Customer Bookings</p>
          
          <div className='flex flex-col gap-4'>
            {data.recentBookings.length > 0 ? (
              data.recentBookings.map((booking, index) => (
                <div key={index} className='flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all'>
                  <div className='flex items-center gap-4'>
                    <div className='hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 shrink-0'>
                      <img src={assets.listIconColored} alt='' className='w-5 h-5 object-contain opacity-75'/>
                    </div>
                    <div>
                      <p className='font-semibold text-slate-800 text-sm'>
                        {booking.bike?.brand} {booking.bike?.model}
                      </p>
                      <p className='text-xs text-slate-500'>
                        {booking.createdAt?.split('T')[0]}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'> 
                    <p className='font-bold text-slate-800 text-sm'>
                      {currency}{booking.price}
                    </p>
                    <p className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : ''}
                      ${booking.status === 'pending' ? 'bg-amber-100 text-amber-600' : ''}
                      ${booking.status === 'cancelled' ? 'bg-red-100 text-red-600' : ''}
                    `}>
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 py-10">No recent bookings found.</p>
            )}
          </div>
        </div>

        <div className='h-fit bg-slate-900 rounded-xl p-6 shadow-lg text-white'>
            <h1 className='text-slate-400 font-medium text-xs uppercase tracking-wider mb-2'>Monthly Revenue</h1>
            <p className='text-sm text-slate-400 mb-4'>Revenue for current month</p>
            <div className='flex items-baseline gap-1'>
                <p className='text-3xl font-bold tracking-tight'>
                    {currency}{data.monthlyRevenue}
                </p>
            </div>
            <div className='mt-6 pt-4 border-t border-slate-700'>
                <p className='text-xs text-slate-400'>Updated automatically from confirmed bookings</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard