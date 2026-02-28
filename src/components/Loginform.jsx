import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Loginform = ({ closeForm, setIsSignUp , issignup }) => {

  const [loginformdata,setLoginFormData] = useState({email : "", password : ""})

  function loginformChangeHandler(event){
     const {name ,value} = event.target
     setLoginFormData(prevformData => {
      return {...prevformData,
        [name] : value
      }
     } )
  }

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm  px-4">
      
      
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
        
        
        <img src={assets.close_icon} alt='close icon' className='absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer' onClick={closeForm}/>

       
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Please login to continue</p>
        </div>

        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              name='email' 
              id='email'
              placeholder="name@example.com"
              onChange={loginformChangeHandler}
              value={loginformdata.email}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor='password' className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              name='password'
              id='password'
              onChange={loginformChangeHandler}
              value={loginformdata.password}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <button className="w-full bg-slate-900 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors mt-2">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account? <a href="#" className="text-blue-600 font-semibold hover:underline" onClick={()=> setIsSignUp(true)}>Sign up</a>
        </p>

      </div>
    </div>
  )
}

export default Loginform