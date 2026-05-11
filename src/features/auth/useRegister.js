import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { addTask } from "../../services/apiTasks";
import { useDispatch } from "react-redux";
import { setTasks } from "../tasks/tasksSlice";

const createTaskId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

export const useRegister = ({ reset }) => {
    const [registerApi, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let registerHandler = async (data) => {
        try {
            const userData = {
                name: data.name,
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
            const updatedLocalTasks = localTasks.map((task, index) => ({
                ...task,
                userId: res.data.user.id,
                id: Date.now() + index,
                uniqueId: createTaskId()
            }));

            await Promise.all(updatedLocalTasks.map(task => addTask(task)));
            localStorage.setItem("tasks", JSON.stringify(updatedLocalTasks));
            dispatch(setTasks(updatedLocalTasks));

            navigate("/");
            reset();

        } catch (err) {
            console.error(err);
            toast.error("Registration failed. Please try again.");
        }
    };

    return { registerHandler, isLoading };
}
