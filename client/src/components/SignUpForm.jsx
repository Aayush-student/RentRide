import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'



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

  const {setAccessToken,setRefreshToken, setShowLogin , navigate , axios} = useContext(AppContext)

  

  const submitHandler = async(event)=>{
    const {username, email, password, confirm} = signupformdata
         event.preventDefault()
         try{
          if(password !== confirm){
            toast.error("Password does not match!")
            return;
          }

           const {data} = await axios.post(
            '/api/user/register',{username, email, password})

           if(data.success){
           setAccessToken(data.data.accessToken)
           setRefreshToken(data.data.refreshToken)
           localStorage.setItem("accessToken",data.data.accessToken)
           localStorage.setItem("refreshToken",data.data.refreshToken)

           toast.success('Account created !')
           setShowLogin(false)
           closeSignUp()
           navigate('/')
           }
         }
         catch(error){
         const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
           toast.error(errorMsg);
         }
  }
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm  px-4">
          
          
                <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
            
            
            <img src={assets.close_icon} alt='close icon' className='absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer' onClick={closeSignUp}/>
    
           
            <div className="text-center mb-6">
              <p className="text-sm text-slate-500 mt-1">Please SignUp to continue</p>
            </div>
    
            
            <form className="space-y-4" onSubmit={submitHandler}>


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
                <label htmlFor='password' className="block text-sm font-medium text-slate-700 mb-1">Password</label>
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
    
              <button type='submit' className="w-full bg-slate-900 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors mt-2">
                SignUp
              </button>
            </form>
    
          </div>
        </div>
  )
}

export default SignUpForm