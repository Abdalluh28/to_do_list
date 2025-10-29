import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import { useCreateTask } from '../useCreateTask';
import CreateEditTaskForm from './CreateEditTaskForm';
import DeleteModal from './DeleteModal';



const ITEM_HEIGHT = 48;

export default function TaskMenuButton({ task }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const { addTaskHandler } = useCreateTask();

    const handleDuplicate = async () => {
        const newTask = {
            ...task,
            id: Date.now(),
            uniqueId: `${Date.now()}-${Math.random()}`
        };
        await addTaskHandler(newTask);
        handleClose();
    };

    return (
        <Modal>
            <IconButton aria-label="more" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} slotProps={{ paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch' } } }}>
                <MenuItem onClick={handleClose}>
                    <Modal.Open opens="edit-task-form">
                        <span className="w-full text-left">Edit</span>
                    </Modal.Open>
                </MenuItem>
                <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
                <MenuItem onClick={handleClose}>
                    <Modal.Open opens="delete-task">
                        <span className="w-full text-left">Delete</span>
                    </Modal.Open>
                </MenuItem>
            </Menu>

            <Modal.Window name="edit-task-form">
                <CreateEditTaskForm taskToEdit={task} />
            </Modal.Window>
            <Modal.Window name="delete-task">
                <DeleteModal taskId={task.id} />
            </Modal.Window>
        </Modal>
    );
}


