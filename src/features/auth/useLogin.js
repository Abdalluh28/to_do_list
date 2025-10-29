import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { addTask, getTasks } from "../../services/apiTasks";
import { useDispatch } from "react-redux";
import { setTasks } from "../tasks/tasksSlice";

export const useLogin = ({ reset }) => {
    const [loginApi, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let loginHandler = async (data) => {
        const res = await loginApi({
            email: data.email,
            password: data.password
        })

        // error with login
        if (res.error) {
            toast.error(res.error.data);
            throw new Error(res.error.data);
        }

        // login successfully
        toast.success('User logged in successfully');
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // merge tasks from supabase into redux
        const dbTasks = await getTasks(res.data.user.id);
        const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let counter = 0;
        const updatedLocalTasks = localTasks.map(task => {
            return { ...task, userId: res.data.user.id, uniqueId: new Date().getTime() + (counter++) }
        })
        const mergedTasks = [
            ...dbTasks,
            ...updatedLocalTasks.filter(
                localTask => !dbTasks.some(dbTask => dbTask.id === localTask.id)
            )
        ];
        dispatch(setTasks(mergedTasks));
        navigate('/');

        // Save only the new tasks to Supabase
        for (const task of updatedLocalTasks) {
            const exists = dbTasks.find(dbTask => dbTask.id === task.id);
            if (!exists) {
                await addTask(task);
            }
        }

        reset();
    }
    return { loginHandler, isLoading };

}