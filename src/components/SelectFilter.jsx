import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from './FilterSlice';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState('Newest');
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleChoose = (value) => {
        setValue(value);
        dispatch(setSortBy(value));
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-border hover:bg-accent hover:text-accent-foreground h-10 px-4"
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ArrowUpDown className='w-4 h-4' />
                <span>Sort: {value}</span>
            </button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            background: 'transparent',
                            boxShadow: 'none',
                        }
                    }
                }}
            >
                <div className="min-w-[200px] bg-popover border border-border rounded-xl shadow-lg p-1.5 z-50">
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-colors duration-150 text-foreground hover:bg-accent'
                        onClick={() => handleChoose("Newest")}>
                        Newest
                    </div>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-colors duration-150 text-foreground hover:bg-accent'
                        onClick={() => handleChoose("Oldest")}>
                        Oldest
                    </div>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-colors duration-150 text-foreground hover:bg-accent'
                        onClick={() => handleChoose("A-Z")}>
                        A-Z
                    </div>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-colors duration-150 text-foreground hover:bg-accent'
                        onClick={() => handleChoose("Z-A")}>
                        Z-A
                    </div>
                </div>
            </Menu>
        </div>
    );
}
