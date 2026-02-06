import React from "react";
import { assets } from "../assets/assets";
import PickupForm from "./PickupForm";

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white pt-22 pb-12 px-6 overflow-hidden">
            
            <div className="text-center mb-14">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-sm">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600">
                        Luxury Cars on Rent
                    </span>
                </h1>
            </div>
            
            <div className="w-full max-w-5xl z-20 mb-4">
                <PickupForm />
            </div>

            <div className="w-full max-w-5xl flex justify-center -mt-6 md:-mt-10 transition-transform duration-700 hover:scale-[1.02]">
                <img 
                    src={assets.Car} 
                    alt="Luxury Car" 
                    className="w-full h-auto max-h-[60vh] object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.12)]"
                />
            </div>
            
        </div>
    )
}

export default Hero;