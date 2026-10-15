import { useRoutes, Outlet } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import usePreviousRoute from "../hooks/usePreviousRoute"

import Home from '../pages/home/Home'
import Benefits from '../pages/customer/Benefits'
import Search from '../pages/customer/Search'
import Schedule from '../pages/schedule/Schedule'
import Services from '../pages/services/Services'
import EditService from '../pages/services/EditService'
import NewService from '../pages/services/NewService'
import Financial from '../pages/financial/Financial'
import Profile from '../pages/profile/Profile'

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
                    element: <Search />
                }, 
                {
                    path: '/schedule',
                    element: <Schedule />
                }, 
                {
                    path: '/profile',
                    element: <Profile />
                }, 
                {
                    path: '/benefits',
                    element: <Benefits />
                }, 
                {
                    path: '/services',
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Services />
                        }, 
                        {
                            path: 'new',
                            element: <NewService />
                        }, 
                        {
                            path: 'edit/:id', 
                            element: <EditService />
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
