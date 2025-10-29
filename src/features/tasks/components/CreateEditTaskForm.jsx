import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useCreateTask } from '../useCreateTask';
import { useEditTask } from '../useEditTask';
import DatePickerField from './DatePickerFiled';
import SelectButton from './SelectButton';


export default function CreateEditTaskForm({ taskToEdit, onClose = () => { } }) {
    const isEdit = Boolean(taskToEdit?.id);

    const defaultValues = {
        title: taskToEdit?.title || '',
        priority: taskToEdit?.priority || 'low',
        category: taskToEdit?.category || '',
        startDate: taskToEdit?.startDate ? dayjs(taskToEdit.startDate) : dayjs(),
        endDate: taskToEdit?.endDate ? dayjs(taskToEdit.endDate) : dayjs(),
    };

    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm({
        defaultValues
    });
    const { addTaskHandler } = useCreateTask();
    const { editTaskHandler } = useEditTask();

    const startDate = watch('startDate');
    const endDate = watch('endDate');


    const onSubmit = (data) => {
        const task = {
            ...data,
            priority: data.priority.toLowerCase(),
            startDate: data.startDate.format('YYYY-MM-DD'),
            endDate: data.endDate.format('YYYY-MM-DD'),
            status: 'todo',
            id: isEdit ? taskToEdit.id : Date.now(),
        };

        if (isEdit) {
            editTaskHandler(task);

        } else {
            addTaskHandler(task);
        }

        reset(defaultValues);
        onClose();
    };

    const onError = (errors) => {
        console.log(errors);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="bg-white flex flex-col gap-4 rounded-2xl shadow shadow-gray-300 p-5 m-5">
            <p className="self-center text-xl">{isEdit ? 'Edit Task' : 'Add New Task'}</p>

            {/* Title */}
            <div className="flex flex-col items-start">
                <Box sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}>
                    <TextField
                        id="title"
                        label="Task title"
                        variant="outlined"
                        {...register('title', { required: true })}
                    />
                </Box>
                {errors.title && <span className="ml-2 text-red-600">This field is required</span>}
            </div>

            {/* Priority & Category */}
            <div className="flex gap-4 md:items-center flex-col md:flex-row">
                <div>
                    <Controller
                        name="priority"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Box sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}>
                                {/* <SelectButton {...register('priority', { required: true })} /> */}
                                <SelectButton value={field.value || ''} onChange={field.onChange} />

                            </Box>
                        )}
                    />
                    {errors.priority && <span className="ml-2 text-red-600">This field is required</span>}
                </div>
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}>
                        <TextField
                            id="category"
                            label="Category"
                            variant="outlined"
                            {...register('category', { required: true })}
                        />
                    </Box>
                    {errors.category && <span className="ml-2 text-red-600">This field is required</span>}
                </div>
            </div>

            {/* Start & End Dates */}
            <div className="flex gap-4 flex-col md:flex-row">
                <div className="md:w-1/2 w-full">
                    <DatePickerField
                        name="startDate"
                        control={control}
                        endDate={endDate}
                        label="Start Date"
                    />
                </div>
                <div className="md:w-1/2 w-full">
                    <DatePickerField
                        name="endDate"
                        control={control}
                        startDate={startDate}
                        label="End Date"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end mt-3">
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">Cancel</button>
                <button type="submit" className="bg-red-500 hover:bg-red-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">
                    {isEdit ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    );
}
