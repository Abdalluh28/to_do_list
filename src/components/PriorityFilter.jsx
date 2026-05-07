import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPriority } from './FilterSlice';

export default function PriorityFilter() {
    return (
        <div className='flex items-center gap-2 flex-wrap'>
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
        <button className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-300 ${priority === value ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-foreground hover:bg-muted'}`}
            onClick={handleClick}>
            {children}
        </button>
    )
}