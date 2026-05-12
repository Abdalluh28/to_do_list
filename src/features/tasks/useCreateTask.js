import { useDispatch } from "react-redux"
import { addTask as addTaskRedux, deleteTask } from "./tasksSlice";
import { addTask as addTaskApi } from "../../services/apiTasks";
import { toast } from "react-toastify";
import { ensureTaskUniqueId } from "../../utils/taskIds";

export const useCreateTask = () => {
    const dispatch = useDispatch();

    const addTaskHandler = async (task) => {
        const user = JSON.parse(localStorage.getItem("user")) || null;
        const newTask = {
            ...task,
            userId: user?.id || null,
            uniqueId: ensureTaskUniqueId(task),
        };

        dispatch(addTaskRedux(newTask));
        toast.success("Task added successfully");

        if (user) {
            try {
                const res = await addTaskApi(newTask);
                if (res.error) throw new Error(res.error);
            } catch (err) {
                console.log(err)
                toast.error("Error adding task to database");
                dispatch(deleteTask(task.id));
            }
        }
    };


    return { addTaskHandler }
}