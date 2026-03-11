import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";

const AdminRoute = ({ children }) => {
    const { user, isOwner } = useContext(AppContext);
    
    if (!user || !isOwner) {
        return <Navigate to="/" />;
    }
    return children;
};

export {AdminRoute}