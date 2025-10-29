import { Draggable } from '@hello-pangea/dnd';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import Checkbox from '@mui/material/Checkbox';
import TooltipButton from '../../components/TooltipButton';
import { calcDate } from '../../utlis/helpers';
import TaskMenuButton from './components/TaskMenuButton';
import { useEditTask } from './useEditTask';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TaskItem({ task, index }) {
    const startDate = calcDate(task.startDate);
    const endDate = calcDate(task.endDate);

    const { editTaskHandler } = useEditTask()

    const handleDone = () => {
        const updatedTask = {
            ...task,
            status: task.status === 'done' ? 'todo' : 'done'
        };

        editTaskHandler(updatedTask);
    };

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex flex-col gap-4 rounded-2xl shadow shadow-gray-300 p-3 cursor-grab transition-all duration-200 ${snapshot.isDragging ? 'bg-blue-100 shadow-lg scale-[1.02]' : 'bg-white'
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            {task.priority === 'high' ? (
                                <ErrorOutlinedIcon sx={{ color: '#FF0000' }} />
                            ) : task.priority === 'medium' ? (
                                <div className="w-4 h-4 border-2 rounded-full mt-1 border-orange-400 bg-orange-400"></div>
                            ) : (
                                <div className="w-4 h-4 border-2 rounded-full mt-1 border-green-400 bg-green-400"></div>
                            )}
                            <div>
                                <p className={`text-xl font-semibold ${task.status === 'done' ? 'line-through' : ''}`}>{task.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <TooltipButton onClick={handleDone}
                                title={task.status === 'done' ? 'Mark as todo' : 'Mark as done'}>
                                <Checkbox
                                    {...label}
                                    checked={task.status === 'done'}
                                />
                            </TooltipButton>
                            <TaskMenuButton task={task} />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center text-gray-600">
                        <span>{startDate}</span>
                        <span>-</span>
                        <span>{endDate}</span>
                        <QueryBuilderOutlinedIcon sx={{ color: 'gray' }} />
                    </div>

                    <div className="flex gap-2">
                        <span className="bg-gray-300 rounded-3xl px-5 py-1 hover:bg-gray-400 transition-all duration-300 cursor-default">
                            {task.category}
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
