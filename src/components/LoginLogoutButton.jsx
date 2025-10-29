import LoginIcon from '@mui/icons-material/Login';
import { IconButton, Tooltip, tooltipClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../features/auth/useLogout';

export default function LoginLogoutButton({ action, children }) {
    const navigate = useNavigate();
    const { logoutHandler } = useLogout();

    const handleClick = () => {
        if (action === 'login') {
            navigate('/login');
        } else if (action === 'logout') {
            logoutHandler();
        }
    };

    return (
        <Tooltip
            title={action}
            placement="top"
            slotProps={{
                popper: {
                    sx: {
                        [`& .${tooltipClasses.tooltip}`]: {
                            fontSize: '0.9rem',
                            padding: '6px 10px',
                        },
                    },
                },
            }}
        >
            <div className='fixed bottom-5 left-2 flex justify-center items-center w-15 h-15 bg-gray-200 hover:bg-gray-300 transition-all duration-300 cursor-pointer rounded-full z-50'
                onClick={handleClick}>
                {children}
            </div>
        </Tooltip>
    );
}
