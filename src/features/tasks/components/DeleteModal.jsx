import { useDeleteTask } from '../useDeleteTask';

export default function DeleteModal({ taskId, onClose = () => { } }) {

    const { deleteTaskHandler } = useDeleteTask()

    const handleDelete = () => {
        deleteTaskHandler(taskId);
        onClose();
    }


    return (
        <div className="bg-white flex flex-col justify-around gap-4 rounded-2xl shadow shadow-gray-300 min-w-[300px] min-h-[150px] p-5 m-5">
            <p className="text-lg">Are you sure you want to delete this task?</p>
            <div className="flex gap-4 justify-center items-center">
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">Cancel</button>
                <button type="submit" className="bg-red-500 hover:bg-red-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg"
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}
