import { useRoutes } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"

import Home from '../pages/Home'
import Login from '../pages/Login/Login'
import Register from "@/pages/Login/Register"
import NotFound from "../components/commons/NotFound"

const Routes = () => {

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
                    element: <div>Search</div>
                }, 
                {
                    path: '/schedule',
                    element: <div>Schedule</div>
                }, 
                {
                    path: '/profile',
                    element: <div>Profile</div>
                }, 
                {
                    path: '/benefits',
                    element: <div>Benefits</div>
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
