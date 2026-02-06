import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { assets, menuLinks } from '../assets/assets'

const Navbar = () => {
    const [listcars, setListCars] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 px-4 md:px-12 py-1 z-50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 font-sans">
            <div className="w-full flex items-center justify-between">
                
                <Link to="/" className="flex-shrink-0 ml-4 md:ml-8 transition-transform active:scale-95">
                    <img src={assets.carlogo} alt="logo" className="h-16 md:h-20 w-auto object-contain" />
                </Link>

                <div className={`
                    max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[72px] max-sm:left-0 
                    flex flex-col sm:flex-row items-center gap-6 md:gap-10 
                    transition-all duration-300 z-40 bg-white sm:bg-transparent
                    ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full sm:translate-x-0"}
                `}>
                    
                    {menuLinks.map((link, index) => (
                        <Link 
                            key={index} 
                            to={link.path} 
                            onClick={() => setOpen(false)}
                            className={`text-[15px] font-medium tracking-tight transition-all duration-200 ${location.pathname === link.path ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-500 hover:text-blue-600"}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded-full w-72 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                        <input 
                            className="w-full bg-transparent outline-none placeholder-gray-400 text-sm font-normal text-slate-700" 
                            placeholder="Search cars..." 
                            type="text" 
                        />
                        <img alt="search" src={assets.search_icon} className="w-4 h-4 opacity-30" />
                    </div>

                    <div className="flex items-center gap-8">
                        <button 
                            onClick={() => setListCars(!listcars)}
                            className="hidden md:block cursor-pointer text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            {listcars ? "List cars" : "Dashboard"}
                        </button>
                        
                        <Link to="/loginform">
                            <button className="cursor-pointer px-9 py-2.5 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-full text-sm font-medium shadow-sm active:scale-95">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>

                <button 
                    className="sm:hidden p-2 text-slate-400" 
                    onClick={() => setOpen(!open)}
                >
                    <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="w-7 h-7" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar