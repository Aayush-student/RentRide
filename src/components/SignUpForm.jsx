import React, { useState } from 'react'
import { assets } from '../assets/assets'



const SignUpForm = ({closeSignUp}) => {

  const [signupformdata,setSignUpFormData] = useState({username: "", email : "", password : "", confirm : ""})

  function signupChangeHandler(event){
    const {name,value} = event.target
    setSignUpFormData(prevsignupformdata => {
      return {
        ...prevsignupformdata, 
        [name] : value
      }
    })
  }
  return (
    <div> <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm  px-4">
          
          
                <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
            
            
            <img src={assets.close_icon} alt='close icon' className='absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer' onClick={closeSignUp}/>
    
           
            <div className="text-center mb-6">
              <p className="text-sm text-slate-500 mt-1">Please SignUp to continue</p>
            </div>
    
            
            <form className="space-y-4">


                 <div>
                <label htmlFor='username' className="block text-sm font-medium text-slate-700 mb-1">UserName</label>
                <input 
                  type="text" 
                  name='username'
                  id='username'
                  placeholder="Admin1"
                  onChange={signupChangeHandler}
                  value={signupformdata.username}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>


              <div>
                <label htmlFor='email' className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name='email'
                  id='email'
                  placeholder="name@example.com"
                  onChange={signupChangeHandler}
                  value={signupformdata.email}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
    
              <div>
                <label htmlFor='confirm' className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  name='password'
                  id='password'
                  placeholder="••••••••"
                  onChange={signupChangeHandler}
                  value={signupformdata.password}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor='confirm' className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  name='confirm'
                  id='confirm'
                  placeholder="••••••••"
                  onChange={signupChangeHandler}
                  value={signupformdata.confirm}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
    
              <button className="w-full bg-slate-900 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors mt-2">
                SignUp
              </button>
            </form>
    
          </div>
        </div></div>
  )
}

export default SignUpForm