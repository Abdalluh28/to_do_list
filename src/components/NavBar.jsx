import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProfileMenu from './ProfileMenu';
import { LogIn, SquareCheckBig } from 'lucide-react';
import ThemeIcon from '../ui/ThemeIcon';

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
        <header className='sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container mx-auto px-4 max-w-7xl'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex gap-2 items-center'>
                        <span className='w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
                            <SquareCheckBig className='text-white w-5 h-5' />
                        </span>
                        <h1 className='text-2xl font-semibold tracking-widest'>AckiTask</h1>
                    </div>
                    <div className='flex-1 max-w-md mx-8 hidden md:block'>
                        <SearchBar />
                    </div>
                    <div className='flex items-center gap-2'>
                        <ThemeIcon />
                        {user ? (
                            <ProfileMenu handleLogout={handleLogout} user={user} />
                        ) : (
                            <button className='inline-flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-accent hover:text-accent-foreground text-sm w-10 h-10 p-0 cursor-pointer duration-300'
                                onClick={() => navigate('/login')}>
                                <LogIn />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
