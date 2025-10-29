import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Login from './features/auth/Login'
import Register from './features/auth/Register'

export default function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                style={{
                    width: '300px',
                    height: '70px'
                }}
            />
        </>
    )
}
