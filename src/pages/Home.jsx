import AddTaskButton from '../components/AddTaskButton';
import NavBar from '../components/NavBar';
import PriorityFilter from '../components/PriorityFilter';
import Search from '../components/Search';
import SelectFilter from '../components/SelectFilter';
import Tasks from '../features/tasks/Tasks';

export default function Home() {


    return (
        <div>
            <NavBar />
            <div className="flex flex-col sm:flex-row items-center sm:justify-end justify-center gap-4">
                <div className='sm:hidden block'><Search /></div>
                <PriorityFilter />
                <SelectFilter />
            </div>

            <Tasks />
            <AddTaskButton />
        </div>
    )
}
