import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from '../features/tasks/tasksSlice'
import filtersSlice from '../components/filterSlice';

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        filters: filtersSlice,
    },
    devTools: import.meta.env.MODE !== "production",
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
})

export default store;
