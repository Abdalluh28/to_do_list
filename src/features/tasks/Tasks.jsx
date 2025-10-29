import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './TaskList';
import { setTasks } from './tasksSlice';
import { useMemo } from 'react';


export default function Tasks() {
    const tasks = useSelector((state) => state.tasks); // source of truth
    const search = useSelector((state) => state.filters.search);
    const priority = useSelector((state) => state.filters.priority);
    const sortBy = useSelector((state) => state.filters.sortBy);
    const dispatch = useDispatch();

    // Filter + sort tasks without modifying Redux state
    const filteredTasks = useMemo(() => {
        let tempTasks = [...tasks]; // copy tasks

        // filter by search
        if (search) {
            tempTasks = tempTasks.filter((task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // filter by priority
        if (priority !== 'All') {
            tempTasks = tempTasks.filter((task) => task.priority === priority);
        }

        // sort tasks
        const sortedTasks = [...tempTasks]; // copy again before sorting

        switch (sortBy) {
            case 'Newest':
                sortedTasks.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                break;
            case 'Oldest':
                sortedTasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                break;
            case 'A-Z':
                sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Z-A':
                sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'Sort By': // reset to original order
            default:
                // keep tempTasks order (original order)
                break;
        }

        return sortedTasks;
    }, [tasks, search, priority, sortBy]);


    // Handle drag end event (update Redux tasks permanently)
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        const sourceTasks = tasks.filter((t) => t.status === source.droppableId);
        const destTasks = tasks.filter((t) => t.status === destination.droppableId);
        const movedTask = { ...sourceTasks[source.index], status: destination.droppableId };
        const newSourceTasks = sourceTasks.filter((_, i) => i !== source.index);
        const newDestTasks = [...destTasks];
        newDestTasks.splice(destination.index, 0, movedTask);
        const remainingTasks = tasks.filter(
            (t) => t.status !== source.droppableId && t.status !== destination.droppableId
        );

        const updatedTasks =
            source.droppableId === destination.droppableId
                ? [...remainingTasks, ...newDestTasks]
                : [...remainingTasks, ...newSourceTasks, ...newDestTasks];


        dispatch(setTasks(updatedTasks));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex sm:items-center lg:items-start justify-center gap-8 flex-col lg:flex-row pl-5">
                {['todo', 'in-progress', 'done'].map((status) => (
                    <TaskList
                        key={status}
                        list={status}
                        tasks={filteredTasks.filter((t) => t.status === status)}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}
