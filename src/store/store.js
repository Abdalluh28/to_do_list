import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from '../features/tasks/tasksSlice'
import filtersSlice from '../components/FilterSlice';
import { apiSlice } from "./apiSlice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        filters: filtersSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: import.meta.env.MODE !== "production",
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
})

export default store;
