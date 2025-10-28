import { createSlice } from "@reduxjs/toolkit";
// import { tasks } from "../../data/tasks";

const savedTasks = JSON.parse(localStorage.getItem('tasks'))
const initialState = savedTasks || []
//const initialState = []; 


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        deleteTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload)
        },
        updateTask: (state, action) => {
            const index = state.findIndex((task) => task.id === action.payload.id)
            if (index === -1) return
            state[index] = { ...state[index], ...action.payload }; // merge to preserve other fields
        },
        setTasks: (state, action) => [...action.payload],
        resetTasks: () => [...initialState]
    }
})

export const { addTask, deleteTask, updateTask, setTasks, resetTasks } = tasksSlice.actions
export default tasksSlice.reducer


export const getTodoList = (state) => state.tasks.filter((task) => task.status === 'todo')
export const getInProgressList = (state) => state.tasks.filter((task) => task.status === 'in-progress')
export const getDoneList = (state) => state.tasks.filter((task) => task.status === 'done')
export const getAllTasks = (state) => state.tasks