import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../services/userContext";

import MobileNav from "../components/commons/MobileNav";

const ProtectedRoute = () => {
    const { login } = useContext(userContext);

    if (!login) return <Navigate to="/login" replace />;

    return ( 
        <>
        <div className="pb-18">
            <Outlet />
        </div>
        <MobileNav />
        </>
    )
}

export default ProtectedRoute;