import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Modal from './Modal'
import ProfileEdit from './ProfileEdit';
import { LogOut, Settings, User } from 'lucide-react';



const ITEM_HEIGHT = 48;

export default function ProfileMenu({ user, handleLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const tagName = user.user_metadata.name.split(' ').map(name => name[0]).join('').slice(0, 2).toUpperCase();

    return (
        <Modal>
            <div aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <button className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                    <div className='relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-8 h-8 text-xs'>
                        {tagName}
                    </div>
                </button>
            </div>

            <Menu
                id="long-menu"
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

                    {/* User Info */}
                    <div className="px-3 py-2 mb-1">
                        <p className="font-medium text-sm text-foreground">
                            {user.user_metadata.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>

                    <div className="h-px bg-border my-1.5" />

                    {/* Edit Profile */}
                    <Modal.Open opens="edit-profile-modal">
                        <div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-colors duration-150 text-foreground hover:bg-accent"
                            onClick={handleClose}
                        >
                            <User className='w-5 h-5' />
                            <span>Edit Profile</span>
                        </div>
                    </Modal.Open>

                    <div className="h-px bg-border my-1.5" />

                    {/* Logout */}
                    <div
                        onClick={() => {
                            handleLogout();
                            handleClose();
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-colors duration-150 text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20"
                    >
                        <LogOut className='w-5 h-5' />
                        <span>
                            Logout
                        </span>

                    </div>
                </div>
            </Menu>

            {/* Render modal window at the root */}
            <Modal.Window name="edit-profile-modal">
                <ProfileEdit onClose={handleClose} />
            </Modal.Window>


        </Modal>
    );
}

