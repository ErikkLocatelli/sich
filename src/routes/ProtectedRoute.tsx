import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../services/userContext";
import { useIsDesktop } from "@/hooks/useMedia";

import MobileNav from "../components/commons/MobileNav";
import AppSidebar from "../components/commons/AppSidebar";
import NotificationBell from "../components/commons/NotificationBell";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DesktopHeader = () => (
    <header className="sticky top-0 z-10 flex items-center justify-end border-b border-sidebar-border bg-sidebar px-10 py-4">
        <NotificationBell className="size-10.5 rounded-[14px] border-sich-border bg-sich-surface text-sich-heading hover:bg-sich-border" />
    </header>
)

const DesktopLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-(--bg-principal)">
            <DesktopHeader />
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
