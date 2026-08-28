import { useRoutes } from "react-router-dom"

import Home from '../pages/Home'
import Login from '../pages/Login/Login'
import Register from "@/pages/Login/Register"
import NotFound from "../components/commons/NotFound"

const Routes = () => {

    const outlet = useRoutes([
        {
            path: '/',
            element: <Home />
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
