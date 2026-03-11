import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bikes, axios, accessToken, pickUpDate, returnDate, setPickUpDate, setReturnDate } = useContext(AppContext);

  const [bike, setBike] = useState(null);

  useEffect(() => {
    const foundBike = bikes.find((b) => b._id === id);
    setBike(foundBike);
    window.scrollTo(0, 0);
  }, [id, bikes]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!accessToken) {
      toast.error("Please login to book a ride");
      return; 
    }

    try {
      const { data } = await axios.post(
        "/api/bookings/create",
        {
          bike: id,
          pickUpDate: pickUpDate,
          returnDate: returnDate,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (data.success) {
        toast.success("Ride Reserved Successfully 🚀");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!bike) return <Spinner />;

  const specs = [
    { label: "Capacity", icon: assets.users_icon, value: `${bike.seating_capacity} Seats` },
    { label: "Fuel", icon: assets.fuel_icon, value: bike.fuel_type },
    { label: "Gearbox", icon: assets.bike_icon, value: bike.transmission },
    { label: "Location", icon: assets.location_icon, value: bike.location },
  ];

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-12 mt-10 font-['Outfit']">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-900 mb-8 font-bold uppercase text-xs tracking-widest transition-colors"
      >
        <img src={assets.arrow_icon} alt="back" className="w-4 rotate-180" />
        <span>Back to fleet</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 mb-10">
            <img src={bike.image} alt={bike.model} className="w-full h-auto object-contain" />
          </div>

          <section>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              {bike.brand} <span className="text-blue-900">{bike.model}</span>
            </h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">
              {bike.category} • {bike.year}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              {specs.map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 p-4 rounded-2xl text-center">
                  <img src={item.icon} className="w-5 h-5 mx-auto mb-2 opacity-60" alt="" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                  <p className="text-xs font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-2">Description</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{bike.description}</p>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5">
            <div className="mb-8">
              <span className="text-3xl font-black text-slate-900">₹{bike.pricePerDay}</span>
              <span className="text-slate-400 font-bold text-sm ml-1">/ day</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Pickup Date</label>
                <input
                  required
                  type="date"
                  value={pickUpDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-semibold outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Return Date</label>
                <input
                  required
                  type="date"
                  value={returnDate}
                  min={pickUpDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-semibold outline-none focus:border-blue-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white py-5 rounded-3xl font-bold uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 mt-4"
              >
                Book Now
              </button>
            </form>
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
};

export default BikeDetails;