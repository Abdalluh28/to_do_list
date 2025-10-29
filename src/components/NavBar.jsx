import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProfileMenu from './ProfileMenu';

export default function NavBar() {

    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        toast.success('User logged out successfully');
    }

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])

    return (
        <div className='flex p-4 gap-4 justify-between items-center'>
            <div className='flex gap-2'>
                <ChecklistRtlIcon sx={{ color: '#FF0000', mt: 0.5 }} />
                <h1 className='text-2xl font-semibold tracking-widest'>AckiTask</h1>
            </div>
            <div className='sm:block hidden '>
                <Search />
            </div>
            <div>
                {user ? (
                    <ProfileMenu handleLogout={handleLogout} user={user} />
                ) : (
                    <button className='border border-red-500 text-black hover:text-white text-lg tracking-widest px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer'
                        onClick={() => navigate('/login')}>
                        Login
                    </button>
                )}
            </div>
        </div>
    )
}
