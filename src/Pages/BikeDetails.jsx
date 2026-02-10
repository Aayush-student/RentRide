import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyBikeData } from "../assets/assets";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const BikeDetails = ({ bookingData, setBookingData }) => {
  const [bike, setBike] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [dates, setDates] = useState({ pickup: "", return: "" });

  useEffect(() => {
    const foundBike = dummyBikeData.find((bike) => bike._id === id);
    setBike(foundBike);
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (!dates.pickup || !dates.return) {
      alert("Please select both pickup and return dates");
      return;
    }

    const newBooking = {
      ...bike,
      pickupDate: dates.pickup,
      returnDate: dates.return,
      bookingId: Date.now(), 
    };

    setBookingData((prev) => [...prev, newBooking]);
    
    alert(`${bike.brand} ${bike.model} reserved successfully!`);
    navigate("/my-bookings"); 
  };

  if (!bike) return <Spinner />;

  const specialities = [
    { label: "Capacity", icon: assets.users_icon, value: `${bike.seating_capacity} Seats` },
    { label: "Fuel", icon: assets.fuel_icon, value: bike.fuel_type },
    { label: "Gearbox", icon: assets.car_icon, value: bike.transmission }, 
    { label: "Location", icon: assets.location_icon, value: bike.location },
  ];

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-12 mt-10 font-['Outfit']">
      <button 
        type="button" 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-blue-900 mb-8 font-bold uppercase text-xs tracking-widest transition-colors"
      >
        <img src={assets.arrow_icon} alt="back arrow" className="w-4 rotate-180" />
        <span>Back to fleet</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="bg-slate-50 rounded-[3rem] p-10 flex items-center justify-center border border-slate-100 mb-10">
            <img src={bike.image} alt={`${bike.brand} ${bike.model}`} className="w-full h-auto object-contain" />
          </div>

          <section>
            <div className="mb-6">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                {bike.brand} <span className="text-blue-900">{bike.model}</span>
              </h1>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">
                {bike.category} • {bike.year}
              </h3>
            </div>

            <hr className="border-slate-100 my-6" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {specialities.map((spec, index) => (
                <article key={index} className="flex flex-col items-center text-center gap-2 bg-white border border-slate-100 p-4 rounded-2xl hover:shadow-lg transition-shadow">
                  <img src={spec.icon} alt={spec.label} className="w-5 h-5 opacity-60" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{spec.label}</p>
                  <p className="text-xs font-bold text-slate-800">{spec.value}</p>
                </article>
              ))}
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-2">Description</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{bike.description}</p>

            <h2 className="text-lg font-bold text-slate-900 mb-4">Features</h2>
            <ul className="grid grid-cols-2 gap-y-3">
              {bike.features?.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <img src={assets.tick_icon} alt="tick" className="w-4 h-4" />
                  <span className="text-sm font-semibold text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5">
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-black text-slate-900">₹{bike.pricePerDay}</span>
              <span className="text-slate-400 font-bold text-sm">/ per day</span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Pickup Date</label>
                <input 
                  required
                  type="date" 
                  value={dates.pickup}
                  onChange={(e) => setDates({...dates, pickup: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Return Date</label>
                <input 
                  required
                  type="date" 
                  value={dates.return}
                  onChange={(e) => setDates({...dates, return: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-900 to-blue-900 hover:from-black hover:to-blue-950 text-white py-5 rounded-3xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-95 mt-4"
              >
                Book Now
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                No credit card required to reserve
              </p>
            </div>
          </div>
        </aside>
      </div>
      <Footer/>
    </main>
  );
};

export default BikeDetails;