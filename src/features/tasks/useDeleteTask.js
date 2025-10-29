import { useDispatch, useSelector } from "react-redux";
import { deleteTask as deleteTaskRedux, addTask as addTaskRedux } from "./tasksSlice";
import { toast } from "react-toastify";
import { deleteTask as deleteTaskApi } from "../../services/apiTasks";

export const useDeleteTask = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const tasks = useSelector(state => state.tasks);

    const deleteTaskHandler = async (taskId) => {
        // get current task to add it back if any error
        const taskToRestore = tasks.find(task => task.id === taskId);

        // delete task in redux
        dispatch(deleteTaskRedux(taskId))
        toast.success('Task deleted successfully')

        // delete task from supabase
        if (user) {
            const res = await deleteTaskApi(taskToRestore.uniqueId);
            if (res.error && taskToRestore) {
                toast.error("Error deleting task from database");
                dispatch(addTaskRedux(taskToRestore));
            }
        }
    }

    return { deleteTaskHandler }
}