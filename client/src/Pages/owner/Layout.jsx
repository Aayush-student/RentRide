import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import OwnerNavbar from '../../components/owner/OwnerNavbar'
import Sidebar from '../../components/owner/Sidebar'
import { AppContext } from '../../context/Appcontext'

const Layout = () => {

     const {isOwner, navigate} = useContext(AppContext) 

     useEffect(()=>{
      if(!isOwner){
        navigate('/')
      }
     },[isOwner])
  return (
   
   
    <div className='flex flex-col w-full min-h-screen bg-slate-50'>
        

        <div className='w-full z-10'>
            <OwnerNavbar/>
        </div>
    

        <div className='flex flex-1 w-full'>
            
            
            <Sidebar/>
            
           
            <main className='flex-1 w-full p-6 overflow-y-auto'>
                <Outlet />
            </main>
        
        </div>
    </div>
  )
}

export default Layout