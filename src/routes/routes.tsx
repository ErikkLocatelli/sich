import { useRoutes, Outlet } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import usePreviousRoute from "../hooks/usePreviousRoute"

import Home from '../pages/home/Home'
import Benefits from '../pages/customer/Benefits'
import Search from '../pages/customer/Search'
import ProviderBooking from '../pages/customer/ProviderBooking'
import Schedule from '../pages/schedule/Schedule'
import ScheduleDisponibilty from '../pages/schedule/ScheduleDisponibilty'
import AppointmentDetails from '../pages/schedule/AppointmentDetails'
import ScheduleHistoryAll from '../pages/schedule/ScheduleHistoryAll'
import Products from '../pages/products/Products'
import EditProduct from '../pages/products/EditProduct'
import NewProduct from '../pages/products/NewProduct'
import Financial from '../pages/financial/Financial'
import Profile from '../pages/profile/Profile'
import ProfileAddress from '../pages/profile/ProfileAddress'
import ProfilePassword from '../pages/profile/ProfilePassword'

import Login from '../pages/login/Login'
import Register from "../pages/login/Register"

import NotFound from "../components/commons/NotFound"

const Routes = () => {
    usePreviousRoute()

    const outlet = useRoutes([
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <Home />
                }, 
                {
                    path: '/search',
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Search />
                        },
                        {
                            path: ':providerId',
                            element: <ProviderBooking />
                        }
                    ]
                },
                {
                    path: '/schedule',
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Schedule />
                        }, 
                        {
                            path: 'disponibility',
                            element: <ScheduleDisponibilty />
                        },
                        {
                            path: 'history',
                            element: <ScheduleHistoryAll />
                        },
                        {
                            path: 'appointment/:id',
                            element: <AppointmentDetails />
                        }
                    ]
                }, 
                {
                    path: '/profile',
                    element: <Outlet />,
                    children: [
                        { index: true, element: <Profile /> },
                        { path: 'address', element: <ProfileAddress /> },
                        { path: 'password', element: <ProfilePassword /> }
                    ]
                }, 
                {
                    path: '/benefits',
                    element: <Benefits />
                }, 
                {
                    path: '/products',
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Products />
                        }, 
                        {
                            path: 'new',
                            element: <NewProduct />
                        }, 
                        {
                            path: 'edit/:id', 
                            element: <EditProduct />
                        }
                    ]
                },
                {
                    path: '/financial',
                    element: <Financial />
                }
            ]
        }, 
        {
            path: '/login',
            element: <Login />
        }, 
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ])
    
    return outlet
}

export default Routes
