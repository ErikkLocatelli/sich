import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../services/userContext";

const ProtectedRoute = () => {
    const { login } = useContext(userContext);

    if (!login) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;