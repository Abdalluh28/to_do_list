import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import TaskItem from './TaskItem'

export default function TaskList({ list, tasks }) {

    const title = list === 'todo' ? 'To Do' : list === 'in-progress' ? 'In Progress' : 'Done';

    return (
        <div className='rounded-2xl p-4 transition-all duration-300'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <div className={` w-2 h-2 rounded-full
                        ${list === 'todo' ? 'bg-yellow-500' :
                            list === 'in-progress' ? 'bg-purple-500' :
                                'bg-green-500'
                        }`}></div>
                    <h3 className='font-semibold text-foreground'>{title}</h3>
                    <span className='text-sm text-muted-foreground'>
                        (
                        {tasks.length}
                        )
                    </span>
                </div>
            </div>

            <Droppable droppableId={list}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='space-y-3'
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
