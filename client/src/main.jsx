import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Home, { loader as homeLoader } from './pages/Home'
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente'
import ErrorPage from './components/ErrorPage'
import { action as eliminarClienteAction } from './components/Cliente'

const router = createBrowserRouter([
    { 
        path: '/', 
        element: <Layout />,
        children: [
            { 
                index: true, 
                element: <Home />, 
                loader: homeLoader, 
                errorElement: <ErrorPage />
            },
            { 
                path: '/clientes/nuevo', 
                element: <NuevoCliente />, 
                action: nuevoClienteAction,
                errorElement: <ErrorPage />
            },
            { 
                path: '/clientes/:idCliente/editar', 
                element: <EditarCliente />, 
                loader: editarClienteLoader,
                action: editarClienteAction,
                errorElement: <ErrorPage />
            },
            { 
                path: '/clientes/:idCliente/eliminar', 
                action: eliminarClienteAction,
                // errorElement: <ErrorPage />
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
