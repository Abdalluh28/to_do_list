import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTask } from '../tasksSlice';
import { toast } from 'react-toastify';

export default function DeleteModal({ taskId, onClose = () => { } }) {

    const disptach = useDispatch();
    const handleDelete = () => {
        disptach(deleteTask(taskId));
        toast.success('Task deleted successfully');
        onClose();
    }


    return (
        <div className="bg-white flex flex-col justify-around gap-4 rounded-2xl shadow shadow-gray-300 min-w-[400px] min-h-[150px] p-5 m-5">
            <p className="text-lg">Are you sure you want to delete this task?</p>
            <div className="flex gap-4 justify-center items-center">
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">Cancel</button>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">Delete</button>
            </div>
        </div>
    )
}
