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
            <div className="flex justify-between lg:flex-row flex-col w-full px-4 gap-2">

                <div className="flex justify-center">
                    <Search />
                </div>

                <div className="flex justify-center gap-4">
                    <PriorityFilter />
                    <SelectFilter />
                </div>
            </div>

            <Tasks />
            <AddTaskButton />
        </div>
    )
}
