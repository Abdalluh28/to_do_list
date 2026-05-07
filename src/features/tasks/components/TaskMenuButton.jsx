import Menu from '@mui/material/Menu';
import { useState } from 'react';

import Modal from '../../../components/Modal';

import { useCreateTask } from '../useCreateTask';

import CreateEditTaskForm from './CreateEditTaskForm';
import DeleteModal from './DeleteModal';

import {
    Copy,
    EllipsisVertical,
    Pencil,
    Trash2
} from 'lucide-react';

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

            {/* Trigger Button */}
            <button
                className='inline-flex items-center justify-center rounded-lg duration-300 hover:bg-accent hover:text-accent-foreground text-sm w-8 h-8 p-0'
                onClick={handleClick}
                aria-label='more'
            >
                <EllipsisVertical className='w-4 h-4' />
            </button>

            {/* Menu */}
            <Menu
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

                <div className="min-w-[180px] bg-popover border border-border rounded-xl shadow-lg p-1.5">

                    {/* Edit */}
                    <Modal.Open opens="edit-task-form">
                        <button
                            onClick={handleClose}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-all duration-200 text-foreground hover:bg-accent"
                        >
                            <Pencil className='w-4 h-4' />

                            <span className='text-sm'>
                                Edit
                            </span>
                        </button>
                    </Modal.Open>

                    {/* Duplicate */}
                    <button
                        onClick={handleDuplicate}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-all duration-200 text-foreground hover:bg-accent"
                    >
                        <Copy className='w-4 h-4' />

                        <span className='text-sm'>
                            Duplicate
                        </span>
                    </button>

                    <div className="h-px bg-border my-1.5" />

                    {/* Delete */}
                    <Modal.Open opens="delete-task">
                        <button
                            onClick={handleClose}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none transition-all duration-200 text-red-500 hover:bg-red-500/10"
                        >
                            <Trash2 className='w-4 h-4' />

                            <span className='text-sm'>
                                Delete
                            </span>
                        </button>
                    </Modal.Open>

                </div>

            </Menu>

            {/* Edit Modal */}
            <Modal.Window name="edit-task-form">
                <CreateEditTaskForm taskToEdit={task} />
            </Modal.Window>

            {/* Delete Modal */}
            <Modal.Window name="delete-task">
                <DeleteModal taskId={task.id} />
            </Modal.Window>

        </Modal>
    );
}