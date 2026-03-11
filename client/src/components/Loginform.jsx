import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'

const Loginform = ({ closeForm, setIsSignUp }) => {
    const { 
        axios, 
        setAccessToken, 
        setRefreshToken, 
        setUser, 
        setShowLogin, 
        navigate 
    } = useContext(AppContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/user/login', { email, password })
            
            if (data.success) {
                setAccessToken(data.data.accessToken) 
                setRefreshToken(data.refreshToken)
                setUser(data.data.user)
                
                localStorage.setItem('accessToken', data.data.accessToken)
                localStorage.setItem('refreshToken', data.data.refreshToken)
                
                toast.success("Welcome back!")
                setShowLogin(false)
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please check credentials.")
        }
    }

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
                
                <button 
                    onClick={closeForm}
                    className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
                >
                    <img src={assets.close_icon} className="w-4 h-4" alt="close" />
                </button>

                <form onSubmit={handleSubmit} className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-blue-950">Login</h2>
                        <p className="text-slate-500 text-sm mt-2">Enter your details to access your account</p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] uppercase font-bold text-slate-400 tracking-widest ml-1">Email Address</label>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-900 focus:bg-white transition-all text-slate-800"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] uppercase font-bold text-slate-400 tracking-widest ml-1">Password</label>
                            <input 
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-900 focus:bg-white transition-all text-slate-800"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full mt-8 bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                    >
                        Sign In
                    </button>

                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <p className="text-slate-500 text-sm">
                            Don't have an account? {' '}
                            <button 
                                type="button"
                                onClick={() => setIsSignUp(true)}
                                className="text-blue-900 font-bold hover:underline"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Loginform