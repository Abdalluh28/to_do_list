import { useDispatch } from "react-redux"
import { addTask as addTaskRedux, deleteTask } from "./tasksSlice";
import { addTask as addTaskApi } from "../../services/apiTasks";
import { toast } from "react-toastify";

export const useCreateTask = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const addTaskHandler = async (task) => {
        // add task to redux
        dispatch(addTaskRedux(task))
        toast.success('Task added successfully')

        // add task to supabase
        if (user) {
            task = { ...task, userId: user.id, uniqueId: `${Date.now()}-${Math.random()}` }
            const res = await addTaskApi(task);

            if (res.error) {
                toast.error("Error adding task to database");
                dispatch(deleteTask(task.id));
            }
        }
    }

    return { addTaskHandler }
}