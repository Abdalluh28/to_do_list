import { Tooltip, tooltipClasses } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Modal from './Modal';
import CreateEditTaskForm from '../features/tasks/components/CreateEditTaskForm';

export default function AddTaskButton() {

    return (
        <Modal>
            <Tooltip
                title="Add Task"
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
                <div className='fixed bottom-7 right-7 flex justify-center items-center w-20 h-20 bg-gray-200 hover:bg-gray-300 transition-all duration-300 cursor-pointer rounded-full z-50'
                >
                    <Modal.Open opens="Add-Task">
                        <AddCircleOutlineOutlinedIcon sx={{ fontSize: '2.5rem' }} />
                    </Modal.Open>
                </div>
            </Tooltip>
            <Modal.Window name="Add-Task">
                <CreateEditTaskForm />
            </Modal.Window>
        </Modal>
    );
}
