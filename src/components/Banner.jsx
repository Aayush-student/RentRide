import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
    return (
        <div className="w-full py-8 px-6">
            <div className="max-w-[1080px] mx-auto bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-100 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/5">
                
                <div className="flex flex-col flex-1 text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600">
                            Do You Own a Luxury Car?
                        </span>
                    </h1>
                    <p className="text-slate-500 font-medium text-base leading-snug mb-6 max-w-lg">
                        Monetize your vehicle effortlessly. We handle insurance and 
                        verification so you can earn stress-free passive income.
                    </p>

                    <button className="w-fit bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95">
                        List your Car
                    </button>
                </div>

                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <img 
                        src={assets.banner_car_image} 
                        alt="Banner Car"
                        className="w-full max-w-[380px] h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
                    />
                </div>
                
            </div>
        </div>
    )
}

export default Banner;