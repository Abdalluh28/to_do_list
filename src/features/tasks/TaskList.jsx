import { Droppable } from '@hello-pangea/dnd';
import { CircleCheck, ListTodo, LoaderCircle } from 'lucide-react';
import TaskItem from './TaskItem';

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
                                <>
                                    {list === 'todo' ?
                                        (
                                            <div className='flex flex-col items-center justify-center py-12 px-4'>
                                                <div className='w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-3'>
                                                    <ListTodo className='w-6 h-6 text-yellow-600 dark:text-yellow-400' />
                                                </div>
                                                <h4 className='text-sm font-medium mb-1 text-foreground'>No tasks to do</h4>
                                                <p className='text-xs text-muted-foreground text-center max-w-[200px]'>Create a new task or drag tasks here to get started</p>
                                            </div>
                                        ) :
                                        list === 'in-progress' ?
                                            (
                                                <div className='flex flex-col items-center justify-center py-12 px-4'>
                                                    <div className='w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3'>
                                                        <LoaderCircle className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                                                    </div>
                                                    <h4 className='text-sm font-medium mb-1 text-foreground'>Nothing in progress</h4>
                                                    <p className='text-xs text-muted-foreground text-center max-w-[200px]'>Drag tasks here when you start working on them</p>
                                                </div>
                                            ) :
                                            (
                                                <div className='flex flex-col items-center justify-center py-12 px-4'>
                                                    <div className='w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3'>
                                                        <CircleCheck className='w-6 h-6 text-green-600 dark:text-green-400' />
                                                    </div>
                                                    <h4 className='text-sm font-medium mb-1 text-foreground'>No completed tasks</h4>
                                                    <p className='text-xs text-muted-foreground text-center max-w-[200px]'>Completed tasks will appear here</p>
                                                </div>
                                            )
                                    }
                                </>
                            )
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
