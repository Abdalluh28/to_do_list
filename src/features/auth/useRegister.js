import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { addTask } from "../../services/apiTasks";

export const useRegister = ({ reset }) => {
    const [registerApi, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    let registerHandler = async (data) => {
        // merge first name and last name
        data = {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            password: data.password
        }

        const res = await registerApi({
            name: data.name,
            email: data.email,
            password: data.password
        });

        // error with register
        if (res.error) {
            toast.error(res.error.message);
            throw new Error(res.error.message)
        }

        // register successfully
        toast.success('User registered successfully')
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // saving local tasks to supabase
        const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let counter = 0;
        const updatedLocalTasks = localTasks.map(task => {
            return { ...task, userId: res.data.user.id, uniqueId: new Date().getTime() + (counter++) }
        })
        updatedLocalTasks.map(async (task) => {
            await addTask(task);
        })


        // navigate to home
        navigate('/');
        reset();
    }
    return { registerHandler, isLoading };
}