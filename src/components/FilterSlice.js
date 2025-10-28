import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    sortBy: 'All',
    search: '',
    priority: 'All',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setPriority: (state, action) => {
            state.priority = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
    }
})

export const { setSortBy, setPriority, setSearch } = filterSlice.actions
export default filterSlice.reducer