import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPriority } from './filterSlice';

export default function PriorityFilter() {
    return (
        <div>
            <Button value="All">All</Button>
            <Button value="high">High</Button>
            <Button value="medium">Medium</Button>
            <Button value="low">Low</Button>
        </div>
    )
}

function Button({ children, value }) {

    const priority = useSelector(state => state.filters.priority);
    const dispacth = useDispatch();
    const handleClick = () => {
        dispacth(setPriority(value));
    }


    return (
        <button className={`border border-blue-500 text-black hover:bg-blue-700 hover:text-white font-semibold tracking-widest py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 mr-2 
            ${priority === value ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={handleClick}>
            {children}
        </button>
    )
}