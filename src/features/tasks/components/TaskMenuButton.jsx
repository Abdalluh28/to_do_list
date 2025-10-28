import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import CreateEditTaskForm from './CreateEditTaskForm';
import DeleteModal from './DeleteModal';
import { useDispatch } from 'react-redux';
import { addTask } from '../tasksSlice';



const ITEM_HEIGHT = 48;

export default function TaskMenuButton({ task }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const dispatch = useDispatch();

    const handleDuplicate = () => {
        task = { ...task, id: Date.now() };
        dispatch(addTask(task));
        handleClose();
    }

    return (
        <Modal>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

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
                    <Modal.Open opens="edit-task-form">
                        <span className="w-full text-left">Edit</span>
                    </Modal.Open>
                </MenuItem>

                <MenuItem key={'Duplicate'} onClick={handleDuplicate}>
                    Duplicate
                </MenuItem>

                <MenuItem key={'Delete'} onClick={handleClose}>
                    <Modal.Open opens="delete-task">
                        <span className="w-full text-left">Delete</span>
                    </Modal.Open>
                </MenuItem>
            </Menu>

            {/* Render modal window at the root */}
            <Modal.Window name="edit-task-form">
                <CreateEditTaskForm taskToEdit={task} />
            </Modal.Window>

            <Modal.Window name="delete-task">
                <DeleteModal taskId={task.id} />
            </Modal.Window>
        </Modal>
    );
}

