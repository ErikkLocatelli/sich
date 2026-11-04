import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../services/userContext";
import { useIsDesktop } from "@/hooks/useMedia";

import MobileNav from "../components/commons/MobileNav";
import AppSidebar from "../components/commons/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DesktopLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-(--bg-principal)">
            <Outlet />
        </SidebarInset>
    </SidebarProvider>
)

const MobileLayout = () => (
    <>
        <div className="pb-18">
            <Outlet />
        </div>
        <MobileNav />
    </>
)

const ProtectedRoute = () => {
    const { login, authReady } = useContext(userContext);
    const isDesktop = useIsDesktop();

    if (!authReady) return null;
    if (!login) return <Navigate to="/login" replace />;

    return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}

export default ProtectedRoute;
