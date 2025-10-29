import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'

export default function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
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
