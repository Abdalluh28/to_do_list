import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { addTask } from "../../services/apiTasks";

export const useRegister = ({ reset }) => {
    const [registerApi, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    let registerHandler = async (data) => {
        try {
            const userData = {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                password: data.password,
            };

            const res = await registerApi(userData);

            if (res.error) {
                toast.error(res.error.message);
                throw new Error(res.error.message);
            }

            toast.success("User registered successfully");
            localStorage.setItem("user", JSON.stringify(res.data.user));

            const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedLocalTasks = localTasks.map(task => ({
                ...task,
                userId: res.data.user.id,
                uniqueId: task.uniqueId || `${Date.now()}-${Math.random()}`
            }));

            await Promise.all(updatedLocalTasks.map(task => addTask(task)));

            navigate("/");
            reset();

        } catch (err) {
            console.error(err);
            toast.error("Registration failed. Please try again.");
        }
    };

    return { registerHandler, isLoading };
}