import { Outlet } from 'react-router-dom';
import Auth from './Auth';

export default function AuthLayout() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className='flex items-center justify-center p-8 bg-background'>
                <div className='w-full max-w-md'>
                    <Outlet />
                </div>
            </div>

            <Auth />
        </div>
    );
}