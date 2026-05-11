import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AuthLayout from './features/auth/AuthLayout'

export default function App() {
    const theme = useSelector(state => state.theme);
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme])

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            element: <AuthLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element: <Register />,
                },
            ]
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
