import React from "react";
import { assets } from "../assets/assets";
import PickupForm from "./PickupForm";

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen bg-white pt-20 px-4 overflow-x-hidden font-['Outfit']">
            
            <div className="text-center w-full max-w-7xl mx-auto z-10 mb-10">
                <h1 className="text-[5.5vw] min-[400px]:text-[40px] lg:text-[80px] font-bold tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-900 drop-shadow-sm pb-2">
                        Ride the Scooty with Freedom
                </h1>
            </div>
        
            <div className="w-full -mt-8 max-w-4xl z-20 mb-8 transform hover:-translate-y-1 transition-transform duration-500">
                <PickupForm />
            </div>

            <div className="relative w-full max-w-4xl flex justify-center z-10 mb-20">
                
                <img 
                    src={assets.group} 
                    alt="Scooter Rental Group" 
                    // SIZE FIX: Reduced max-h to 400px for a sleek, banner-like look.
                    className="w-full h-[350px] md:h-[450px] object-cover rounded-[30px] shadow-2xl border border-gray-100"
                />

                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 px-4">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 text-xs md:text-sm font-bold text-slate-800">
                        ✨ Premium Rides
                    </div>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 text-xs md:text-sm font-bold text-slate-800">
                        🛡️ Zero Hidden Fees
                    </div>
                    <div className="hidden md:block bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 text-xs md:text-sm font-bold text-slate-800">
                        ✅ Affordable Rates
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Hero;