import { Plus } from 'lucide-react';
import CreateEditTaskForm from '../features/tasks/components/CreateEditTaskForm';
import Modal from './Modal';

export default function AddTaskButton() {

    return (
        <Modal>
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className=''>
                    <h1 className='text-2xl md:text-3xl mb-2'>My Tasks</h1>
                    <p className='text-sm md:text-base text-muted-foreground'>Mangae your tasks efficiently</p>
                </div>
                <div className='inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-10 px-4 shrink-0'>
                    <Modal.Open opens="Add-Task">
                        <button className='flex gap-2 items-center cursor-pointer'>
                            <Plus className='w-4 h-4' />
                            <p className='text-sm hidden md:block'>Add Task</p>
                        </button>
                    </Modal.Open>
                </div>
            </div>
            <Modal.Window name="Add-Task">
                <CreateEditTaskForm />
            </Modal.Window>
        </Modal>
    );
}
