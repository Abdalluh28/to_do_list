import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import TaskItem from './TaskItem'

export default function TaskList({ list, tasks }) {

    return (
        <div className='flex flex-col gap-4 m-3 lg:w-1/3 xl:w-1/4 sm:w-1/2 w-[90%]'>
            <div
                className={`flex gap-3 items-center pl-5 rounded-md py-2 mt-4 
                    ${list === 'todo' ? 'bg-blue-400' : list === 'in-progress' ? 'bg-orange-400' : 'bg-green-400'}`}
            >
                <p
                    className={`w-4 h-4 border-2 rounded-full mt-1 
                        ${list === 'todo' ? 'border-blue-600' : list === 'in-progress' ? 'border-orange-600' : 'border-green-600'}
                        ${list === 'todo' ? 'bg-blue-600' : list === 'in-progress' ? 'bg-orange-600' : 'bg-green-600'}`}
                ></p>
                <p className='text-2xl font-bold'>
                    {list === 'todo'
                        ? 'Todo'
                        : list === 'in-progress'
                            ? 'In Progress'
                            : 'Done'}
                </p>
            </div>

            <Droppable droppableId={list}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='flex flex-col gap-4 min-h-[100px]'
                    >
                        {tasks.length > 0 ?
                            tasks.map((task, index) => (
                                <TaskItem key={task.id} task={task} index={index} />
                            ))
                            : (
                                <div className='flex justify-center items-center h-full'>
                                    {list === 'todo' ?
                                        <p className='text-lg'>All clear! No tasks to tackle… for now.</p> :
                                        list === 'in-progress' ?
                                            <p className='text-lg'>Nothing being worked on… yet. Let’s start a task!</p> :
                                            <p className='text-lg'>No completed tasks yet. Keep going—you’ll get there!</p>
                                    }
                                </div>
                            )
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
