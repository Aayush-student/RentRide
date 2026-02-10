import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen mt-12 bg-gradient-to-r from-blue-50/30 via-white to-indigo-50/30 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] overflow-hidden font-['Outfit']">
            
            <div className='w-full px-6 md:px-16 py-12'>
                
                <div className="flex flex-wrap justify-between items-start gap-y-10">

                    <div className="w-full md:w-[30%] flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                                <img src={assets.car_icon} className="w-5 h-5 brightness-0 invert" alt="Logo" />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
                                Rent<span className="text-blue-900">Ride</span>
                            </span>
                        </div>
                        <p className='text-sm text-slate-500 w-full leading-relaxed font-medium'>
                            Redefining the standard of premium bike rentals. Experience freedom and comfort on every journey.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-xs font-bold uppercase tracking-widest text-slate-900'>Company</h3>
                        <div className="flex flex-col gap-2 mt-4">
                            <a href="#" className='text-sm text-slate-500 hover:text-blue-900 font-medium transition-colors'>About Us</a>
                            <a href="#" className='text-sm text-slate-500 hover:text-blue-900 font-medium transition-colors'>Our Fleet</a>
                            <a href="#" className='text-sm text-slate-500 hover:text-blue-900 font-medium transition-colors'>Contact</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-xs font-bold uppercase tracking-widest text-slate-900'>Socials</h3>
                        <div className="flex flex-col gap-2 mt-4">
                            <a href="#" className='text-sm text-slate-500 hover:text-blue-900 font-medium transition-colors'>Instagram</a>
                            <a href="#" className='text-sm text-slate-500 hover:text-blue-900 font-medium transition-colors'>Twitter</a>
                        </div>
                    </div>

                    <div className="w-full md:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-xs font-bold uppercase tracking-widest text-slate-900'>Newsletter</h3>
                        <div className="flex items-center bg-white border border-slate-200 h-11 w-full rounded-full overflow-hidden shadow-sm mt-4 focus-within:border-blue-900 transition-colors">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full h-full pl-4 outline-none text-xs bg-transparent text-slate-900 placeholder-slate-400 font-medium" 
                            />
                            <button className="bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 active:scale-95 transition-all px-5 h-8 rounded-full text-xs font-bold text-white mr-1.5 shadow-md shadow-blue-900/20">
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                <div className='w-full h-px mt-10 mb-6 bg-gradient-to-r from-transparent via-slate-200 to-transparent'></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                    <p className='text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold'>© 2026 RentRide International</p>
                    <div className="flex items-center gap-6">
                        <a href='#' className='text-[10px] uppercase tracking-widest text-slate-400 hover:text-blue-900 font-bold transition-colors'>Terms</a>
                        <a href='#' className='text-[10px] uppercase tracking-widest text-slate-400 hover:text-blue-900 font-bold transition-colors'>Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;