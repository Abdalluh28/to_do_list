import { useDispatch, useSelector } from "react-redux"
import { updateTask } from "./tasksSlice";
import { editTask } from "../../services/apiTasks";
import { toast } from "react-toastify";

export const useEditTask = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const tasks = useSelector(state => state.tasks);

    const editTaskHandler = async (task) => {
        const prevTaskState = tasks.find(t => t.id === task.id);
        dispatch(updateTask(task));
        toast.success("Task edited successfully");

        if (user) {
            try {
                const res = await editTask(task);
                if (res.error) {
                    throw new Error(res.error);
                }
            } catch (err) {
                console.log(err)
                toast.error("Error editing task in database");
                dispatch(updateTask(prevTaskState));
            }
        }
    };


    return { editTaskHandler }
}