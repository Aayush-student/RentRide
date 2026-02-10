import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { assets, menuLinks } from '../assets/assets'

const Navbar = () => {
    const [listbikes, setListBikes] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-12 py-2 z-50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 font-['Outfit']">
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
                
                <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
                    <img src={assets.carlogo} alt="logo" className="h-16 md:h-20 w-auto object-contain" />
                </Link>

                <div className={`
                    max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[72px] max-sm:left-0 
                    flex flex-col sm:flex-row items-center gap-6 md:gap-10 
                    transition-all duration-300 z-40 bg-white sm:bg-transparent
                    ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full sm:translate-x-0"}
                `}>
                    
                    <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                        {menuLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                to={link.path} 
                                onClick={() => setOpen(false)}
                                className={`text-[16px] font-medium tracking-tight transition-all duration-300 relative group
                                ${location.pathname === link.path 
                                    ? "text-blue-950 font-semibold" 
                                    : "text-gray-500 hover:text-blue-950"
                                }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-950 rounded-full transition-all duration-300 ${location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-lg w-64 focus-within:border-blue-900 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-900 transition-all duration-300">
                        <img alt="search" src={assets.search_icon} className="w-4 h-4 opacity-40 mr-2" />
                        <input 
                            className="w-full bg-transparent outline-none placeholder-gray-400 text-sm text-blue-950 font-medium tracking-tight" 
                            placeholder="Search bikes..." 
                            type="text" 
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setListBikes(!listbikes)}
                            className="hidden md:block cursor-pointer text-[15px] font-medium tracking-tight text-gray-600 hover:text-blue-950 transition-colors"
                        >
                            {listbikes ? "List your bike" : "Dashboard"}
                        </button>
                        
                        <Link to="/loginform">
                            <button className="cursor-pointer px-8 py-2.5 bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white rounded-lg text-[15px] font-medium tracking-wide shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>

                <button 
                    className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors" 
                    onClick={() => setOpen(!open)}
                >
                    <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="w-7 h-7" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar