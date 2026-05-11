import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useCreateTask } from '../useCreateTask';
import { useEditTask } from '../useEditTask';
import DatePickerField from './DatePickerFiled';
import { X } from 'lucide-react';


export default function CreateEditTaskForm({ taskToEdit, onClose = () => { } }) {
    const isEdit = Boolean(taskToEdit?.id);

    const defaultValues = {
        title: taskToEdit?.title || '',
        priority: taskToEdit?.priority || 'low',
        description: taskToEdit?.description || '',
        startDate: taskToEdit?.startDate ? dayjs(taskToEdit.startDate) : dayjs(),
        endDate: taskToEdit?.endDate ? dayjs(taskToEdit.endDate) : dayjs(),
    };

    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm({ defaultValues });
    const { addTaskHandler } = useCreateTask();
    const { editTaskHandler } = useEditTask();

    const startDate = watch('startDate');
    const endDate = watch('endDate');

    const onSubmit = async (data) => {
        const task = {
            ...data,
            priority: data.priority.toLowerCase(),
            startDate: data.startDate.format('YYYY-MM-DD'),
            endDate: data.endDate.format('YYYY-MM-DD'),
            id: isEdit ? taskToEdit.id : Date.now(),
            uniqueId: isEdit ? taskToEdit.uniqueId : `${Date.now()}-${Math.random()}`,
        };

        if (isEdit) {
            await editTaskHandler(task);
        } else {
            await addTaskHandler(task);
        }

        reset(defaultValues);
        onClose();
    };

    const onError = (errors) => console.log(errors);

    return (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 focus:outline-none'>
            <div className='mb-6'>
                <p className="text-xl mb-2 text-foreground">{isEdit ? 'Edit Task' : 'Create New Task'}</p>
                <p className='text-muted-foreground'>{isEdit ? 'Make changes to your task' : 'Add a new task to your board'}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">

                {/* Title */}
                <div className='w-full'>
                    <label htmlFor="title" className='block mb-2 text-foreground/90'>Task title</label>
                    <div className='relative'>
                        <input type="text" id="title"
                            className='w-full h-11 px-4 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            placeholder='Enter task title...' {...register('title', { required: true })}
                             />
                    </div>
                    {errors.title && <span className="ml-2 text-red-600">This field is required</span>}
                </div>

                {/* description */}
                <div>
                    <label className='block mb-2 text-foreground/90'>Description</label>
                    <textarea
                        className='w-full min-h-[100px] px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all resize-none'
                        placeholder='Enter task description...'
                        {...register('description', { required: true })}  />
                    {errors.description && <span className="ml-2 text-red-600">This field is required</span>}
                </div>

                {/* Priority & Status */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block mb-2 text-foreground/90'>Priority</label>
                        <select
                            className='w-full h-11 px-4 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all'
                            {...register('priority', { required: true })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {errors.priority && <span className="ml-2 text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <label className='block mb-2 text-foreground/90'>Status</label>
                        <select
                            className='w-full h-11 px-4 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all'
                            {...register('status', { required: true })}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        {errors.status && <span className="ml-2 text-red-600">This field is required</span>}
                    </div>
                </div>

                {/* Start & End Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DatePickerField name="startDate" control={control} endDate={endDate} label="Start Date" />
                    <DatePickerField name="endDate" control={control} startDate={startDate} label="End Date" />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground h-10 px-4"
                        onClick={onClose} >
                        Cancel
                    </button>
                    <button type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-10 px-4">
                        {isEdit ? 'Update' : 'Create Task'}
                    </button>
                </div>
            </form>
            <button
                className='absolute right-4 top-4 p-2 rounded-lg hover:bg-accent transition-colors'
                onClick={onClose}>
                <X className='w-4 h-4' />
            </button>
        </div>
    );
}
