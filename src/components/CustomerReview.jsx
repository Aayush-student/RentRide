import React from 'react'
import { CustomerData } from '../assets/assets'
import CustomerCard from "./CustomerCard"

const CustomerReview = () => {
  return (
    <div className='w-full py-24'>
        <div className='max-w-[1080px] mx-auto px-6'>
            
            <div className='mb-16 text-center flex flex-col items-center'>
                <h1 className='text-4xl md:text-5xl font-extrabold tracking-tighter mb-4'>
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500'>
                        What Our Customers Say
                    </span>
                </h1>
                <p className='text-slate-500 font-medium text-lg max-w-xl leading-relaxed'>
                    Trusted by thousands of travelers. Here is why they choose us for their  journeys.
                </p>
                <div className='w-16 h-1 bg-blue-600 rounded-full mt-6 opacity-30'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {CustomerData.map((Data) => {
                    return <CustomerCard key={Data.id} Data={Data} />
                })}
            </div>
            
        </div>
    </div>
  )
}

export default CustomerReview;