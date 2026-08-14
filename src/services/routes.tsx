import { useRoutes } from "react-router-dom"

import Home from '../pages/Home'
import Login from '../pages/Login/Login'

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
            path: '*',
            element: <div>404 - Página não encontrada</div> //substitua pelo componente de página 404, quando tiver
        }
    ])
    
    return outlet
}

export default Routes
