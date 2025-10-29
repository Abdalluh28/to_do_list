import { useDispatch, useSelector } from "react-redux";
import { deleteTask as deleteTaskRedux, addTask as addTaskRedux } from "./tasksSlice";
import { toast } from "react-toastify";
import { deleteTask as deleteTaskApi } from "../../services/apiTasks";

export const useDeleteTask = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const tasks = useSelector(state => state.tasks);

    const deleteTaskHandler = async (taskId) => {
        const taskToRestore = tasks.find(task => task.id === taskId);
        dispatch(deleteTaskRedux(taskId));
        toast.success("Task deleted successfully");

        if (user && taskToRestore) {
            try {
                const res = await deleteTaskApi(taskToRestore.uniqueId);
                if (res.error) throw new Error(res.error);
            } catch (err) {
                console.log(err)
                toast.error("Error deleting task from database");
                dispatch(addTaskRedux(taskToRestore));
            }
        }
    };


    return { deleteTaskHandler }
}