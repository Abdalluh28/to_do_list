import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from './FilterSlice';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState('Sort By');
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
            <button className='border border-blue-500 text-black hover:bg-blue-700 hover:text-white font-semibold tracking-widest py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 mr-2'
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <span>{value}</span>
                <ArrowDownwardIcon />
            </button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem onClick={() => handleChoose('Newest')}>Newest to oldest</MenuItem>
                <MenuItem onClick={() => handleChoose('Oldest')}>Oldest to newest</MenuItem>
                <MenuItem onClick={() => handleChoose('A-Z')}>A-Z ascending order</MenuItem>
                <MenuItem onClick={() => handleChoose('Z-A')}>Z-A descending order</MenuItem>
                <MenuItem onClick={() => handleChoose('Sort By')}>Clear</MenuItem>
            </Menu>
        </div>
    );
}
