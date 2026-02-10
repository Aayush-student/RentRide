import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="w-full py-8 px-6 font-['Outfit']">
            <div className="max-w-[1080px] mx-auto bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-100 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/5">
                
                <div className="flex flex-col flex-1 text-left z-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-900">
                            Do You Own a Bike?
                        </span>
                    </h1>
                    <p className="text-slate-500 font-medium text-base leading-snug mb-6 max-w-lg">
                        Monetize your vehicle effortlessly. We handle insurance and 
                        verification so you can earn stress-free passive income.
                    </p>

                    <Link to="/owner">
                        <button className="w-fit bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95">
                            List your Bike
                        </button>
                    </Link>
                </div>

                <div className="flex-1 w-full flex justify-center md:justify-end relative">
                    <img 
                        src={assets.bannerimage} 
                        alt="Banner Bike"
                        className="w-full md:max-w-[480px] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-500"
                    />
                </div>
                
            </div>
        </div>
    )
}

export default Banner;