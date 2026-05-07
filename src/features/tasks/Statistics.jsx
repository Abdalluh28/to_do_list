import { useSelector } from "react-redux"

export default function Statistics() {
    const tasks = useSelector(state => state.tasks);
    const completedTasks = tasks.filter(task => task.status === 'done');
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const todoTasks = tasks.filter(task => task.status === 'todo');

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm opacity-90 mb-1">All Tasks</p>
                <p className="text-3xl font-semibold">{tasks.length}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm opacity-90 mb-1">Completed Tasks</p>
                <p className="text-3xl font-semibold">{completedTasks.length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm opacity-90 mb-1">In Progress Tasks</p>
                <p className="text-3xl font-semibold">{inProgressTasks.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm opacity-90 mb-1">Todo Tasks</p>
                <p className="text-3xl font-semibold">{todoTasks.length}</p>
            </div>
        </div>
    )
}
