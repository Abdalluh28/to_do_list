import { Draggable } from '@hello-pangea/dnd';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { Calendar } from 'lucide-react';
import { calcDate } from '../../utlis/helpers';
import TaskMenuButton from './components/TaskMenuButton';

export default function TaskItem({ task, index }) {
    const startDate = calcDate(task.startDate);
    const endDate = calcDate(task.endDate);



    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="group bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer "
                >
                    <div className='flex-1 min-w-0'>

                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className={`font-medium text-foreground line-clamp-2 ${task.status === 'done' ? 'line-through' : ''}`}>{task.title}</h4>
                            <TaskMenuButton task={task} />
                        </div>

                        <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {task.description}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors ${task.priority === 'high' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' : task.priority === 'medium' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' : 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'}`}>
                                {task.priority}
                            </div>
                            <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                                <Calendar />
                                {startDate} - {endDate}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </Draggable>
    );
}

