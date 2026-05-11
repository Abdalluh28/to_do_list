import { TriangleAlert, X } from 'lucide-react';
import { useDeleteTask } from '../useDeleteTask';

export default function DeleteModal({ taskId, title, onClose = () => { } }) {

    const { deleteTaskHandler } = useDeleteTask()

    const handleDelete = () => {
        deleteTaskHandler(taskId);
        onClose();
    }


    return (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 focus:outline-none">
            <div className='mb-6'>
                <h2 className="text-xl mb-2 text-foreground">Delete Task</h2>
            </div>
            <div className='space-y-4'>
                <div className='flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20'>
                    <TriangleAlert className='w-5 h-5 text-destructive flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                        <p className='text-sm text-foreground'>Are you sure you want to delete "
                            <span className='font-semibold'>{title}</span>"?</p>
                        <p className='text-sm text-muted-foreground mt-1'>This action cannot be undone.</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose}
                        className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground h-10 px-4">
                        Cancel
                    </button>
                    <button type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm h-10 px-4"
                        onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
            <button
                className='absolute right-4 top-4 p-2 rounded-lg hover:bg-accent transition-colors'
                onClick={onClose}>
                <X className='w-4 h-4' />
            </button>
        </div>
    )
}
