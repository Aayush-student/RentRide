import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dummyBikeData } from "../assets/assets";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY || "₹";

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    
    const [showLogin, setShowLogin] = useState(false);
    const [bikes, setBikes] = useState([]); 
    const [pickUpDate, setPickUpDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const fetchUser = async () => {
        if (!accessToken || accessToken === "undefined") return;

        try {
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (data.success) {
                setUser(data.data);
                const ownerStatus = data.data.role === "owner";
                setIsOwner(ownerStatus);
                fetchBikes(data.data.role); 
            }
        } catch (error) {
            logout();
        }
    };

    const fetchBikes = async (role = "guest") => {
        try {
            const endpoint = role === "owner" ? '/api/owner/bikes' : '/api/user/getbikes';
            const config = accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
            const { data } = await axios.get(endpoint, config);

            if (data.success) {
                setBikes(data.data);
            }
        } catch (error) {
            setBikes(dummyBikeData);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchUser(); 
        } else {
            fetchBikes("guest"); 
        }
    }, [accessToken]);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsOwner(false);
        setBikes(dummyBikeData);
        setPickUpDate('');
        setReturnDate('');
        navigate('/');
        toast.info("Logged out");
    };

    const value = {
        navigate, currency, accessToken, refreshToken, user, isOwner, 
        setAccessToken, setRefreshToken, setUser, setIsOwner, axios, 
        fetchUser, fetchBikes, bikes, setBikes, logout, pickUpDate, 
        setPickUpDate, returnDate, setReturnDate, showLogin, setShowLogin
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}