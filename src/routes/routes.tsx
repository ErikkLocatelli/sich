import { useRoutes, Outlet } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import usePreviousRoute from "../hooks/usePreviousRoute"

import Home from '../pages/home/Home'
import Benefits from '../pages/customer/Benefits'
import Search from '../pages/customer/Search'
import Schedule from '../pages/schedule/Schedule'
import Products from '../pages/products/Products'
import EditProduct from '../pages/products/EditProduct'
import NewProduct from '../pages/products/NewProduct'
import Financial from '../pages/financial/Financial'
import Profile from '../pages/profile/Profile'

import Login from '../pages/Login/Login'
import Register from "../pages/Login/Register"

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
