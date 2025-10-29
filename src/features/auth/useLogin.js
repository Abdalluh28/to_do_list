import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { addTask, getTasks, editTask } from "../../services/apiTasks";
import { useDispatch } from "react-redux";
import { setTasks } from "../tasks/tasksSlice";

export const useLogin = ({ reset }) => {
    const [loginApi, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandler = async (data) => {
        try {
            // 1️⃣ Login
            const res = await loginApi({
                email: data.email,
                password: data.password,
            });

            if (res.error) {
                toast.error(res.error.data || "Login failed");
                throw new Error(res.error.data || "Login failed");
            }

            const user = res.data.user;
            toast.success("User logged in successfully");
            localStorage.setItem("user", JSON.stringify(user));

            // 2️⃣ Fetch tasks from Supabase
            const dbTasks = await getTasks(user.id);

            // 3️⃣ Get local tasks from localStorage
            const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedLocalTasks = localTasks.map(task => ({
                ...task,
                userId: user.id,
                uniqueId: task.uniqueId || `${Date.now()}-${Math.random()}`
            }));

            // 4️⃣ Merge tasks (prefer local edits)
            const dbTasksMap = Object.fromEntries(dbTasks.map(task => [task.uniqueId, task]));
            updatedLocalTasks.forEach(task => {
                dbTasksMap[task.uniqueId] = task; // overwrite with local edits
            });
            const mergedTasks = Object.values(dbTasksMap);

            // 5️⃣ Save new or edited local tasks to Supabase
            await Promise.all(
                updatedLocalTasks.map(async (task) => {
                    const dbTask = dbTasks.find(t => t.uniqueId === task.uniqueId);
                    try {
                        if (!dbTask) {
                            // New task
                            await addTask(task);
                        } else {
                            // Edited task: check if changed
                            const isChanged = JSON.stringify(dbTask) !== JSON.stringify(task);
                            if (isChanged) await editTask(task);
                        }
                    } catch (err) {
                        console.error("Error syncing task:", err, task);
                    }
                })
            );

            // 6️⃣ Update Redux state
            dispatch(setTasks(mergedTasks));

            // 7️⃣ Reset form and navigate
            reset();
            navigate("/");

        } catch (err) {
            console.error("Login handler error:", err);
            toast.error("Login failed. Please try again.");
        }
    };

    return { loginHandler, isLoading };
};
