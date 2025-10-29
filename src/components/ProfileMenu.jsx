import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Modal from './Modal'
import ProfileEdit from './ProfileEdit';



const ITEM_HEIGHT = 48;

export default function ProfileMenu({ user, handleLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);



    return (
        <Modal>
            <div aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <button className='border border-red-500 text-black hover:text-white text-lg tracking-widest px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer'>
                    {user.user_metadata.name.split(' ')[0]}
                </button>
            </div>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch' } },
                    list: { 'aria-labelledby': 'long-button' }
                }}
            >
                <MenuItem key={'Edit'} onClick={handleClose}>
                    <Modal.Open opens="edit-profile-modal">
                        <span className="w-full text-left">Edit Profile</span>
                    </Modal.Open>
                </MenuItem>


                <MenuItem key={'Delete'} onClick={() => {
                    handleLogout();
                    handleClose();
                }}>
                    logout
                </MenuItem>
            </Menu>

            {/* Render modal window at the root */}
            <Modal.Window name="edit-profile-modal">
                <ProfileEdit onClose={handleClose} />
            </Modal.Window>


        </Modal>
    );
}

