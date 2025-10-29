import { useDispatch, useSelector } from "react-redux"
import { updateTask } from "./tasksSlice";
import { editTask } from "../../services/apiTasks";
import { toast } from "react-toastify";

export const useEditTask = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const tasks = useSelector(state => state.tasks);

    const editTaskHandler = async (task) => {
        // get current task to add it back if any error
        const prevTask = tasks.find(t => t.id === task.id);

        // update task in redux
        dispatch(updateTask(task))
        toast.success('Task edited successfully')

        // update task to supabase
        if (user) {
            task = { ...task, userId: user.id, uniqueId: `${Date.now()}-${Math.random()}` }
            const res = await editTask(task)
            if (res.error) {
                toast.error("Error editing task to database");
                dispatch(updateTask(prevTask));
            }
        }
    }

    return { editTaskHandler }
}