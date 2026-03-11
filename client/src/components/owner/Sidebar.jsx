import React, { useContext, useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'
import { toast } from 'react-toastify'

const Sidebar = () => {
    const [image, setImage] = useState(null)
    const { user, axios, fetchUser , accessToken} = useContext(AppContext)

    const updateImage = async () => {
        try {
            const formData = new FormData()
            formData.append('image', image)

            const { data } = await axios.patch('/api/owner/update-userimage', formData,{
                headers: {
                    Authorization: `Bearer ${accessToken}`, 
                }})
            
            if (data.success) {
                await fetchUser()
                toast.success(data.message)
                setImage(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update image")
        }
    }

    return (
        <div className='flex flex-col items-center pt-8 w-20 md:w-64 min-h-screen bg-white border-r border-slate-200 transition-all duration-300'>

            <div className='group relative mb-6'>
                <label htmlFor='image' className='cursor-pointer block relative'>
                    <img 
                        className='w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm'
                        src={image ? URL.createObjectURL(image) : user?.image || assets.user_image} 
                        alt='' 
                    />
                    <input type='file' id='image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])} />

                    <div className='absolute inset-0 hidden bg-black/40 rounded-full group-hover:flex items-center justify-center transition-all'>
                        <img src={assets.edit_icon} className='w-6 h-6 invert opacity-90' alt='' />
                    </div>
                </label>

                {image && (
                    <button 
                        onClick={updateImage}
                        className='absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900 text-white text-[10px] px-3 py-1 rounded-full shadow-md hover:bg-slate-800 transition-colors z-10 whitespace-nowrap'
                    >
                        Save <img src={assets.check_icon} className="w-3 invert" alt="" />
                    </button>
                )}
            </div>

            <p className='mb-8 text-base font-bold text-slate-800 hidden md:block tracking-wide'>
                {user?.username || "Owner"}
            </p>

            <div className='w-full flex flex-col gap-2 px-4'>
                {ownerMenuLinks.map((ownerlink, index) => (
                    <NavLink 
                        to={ownerlink.path} 
                        key={index} 
                        end
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                            ${isActive 
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <img 
                                    src={ownerlink.icon} 
                                    className={`w-5 h-5 object-contain transition-all
                                        ${isActive ? 'brightness-0 invert' : 'opacity-70 group-hover:opacity-100'}
                                    `} 
                                    alt="" 
                                />
                                <span className='hidden md:block font-medium'>
                                    {ownerlink.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar