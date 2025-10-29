import { createSlice } from '@reduxjs/toolkit';

const sortByDeadline = (tasks) =>
    [...tasks].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

// Keep status grouping stable: todo, in-progress, done
const sortAllTasks = (tasks) => {
    const todo = sortByDeadline(tasks.filter(t => t.status === 'todo'));
    const inProgress = sortByDeadline(tasks.filter(t => t.status === 'in-progress'));
    const done = sortByDeadline(tasks.filter(t => t.status === 'done'));
    return [...todo, ...inProgress, ...done];
};
const savedTasks = JSON.parse(localStorage.getItem('tasks'))
const initialState = savedTasks || []

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Replace the whole list (will be sorted)
        setTasks: (state, action) => {
            return sortAllTasks(action.payload || []);
        },
        addTask: (state, action) => {
            // state is proxied by immer; returning value replaces it which is fine
            const newState = [...state, action.payload];
            return sortAllTasks(newState);
        },
        updateTask: (state, action) => {
            const updated = state.map(t => (t.id === action.payload.id ? action.payload : t));
            return sortAllTasks(updated);
        },
        deleteTask: (state, action) => {
            return state.filter(t => t.id !== action.payload);
        },
        // optional: reset
        clearTasks: () => []
    }
});

export const { setTasks, addTask, updateTask, deleteTask, clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
