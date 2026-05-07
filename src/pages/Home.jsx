import AddTaskButton from '../components/AddTaskButton';
import NavBar from '../components/NavBar';
import PriorityFilter from '../components/PriorityFilter';
import SearchBar from '../components/SearchBar';
import SelectFilter from '../components/SelectFilter';
import Statistics from '../features/tasks/Statistics';
import Tasks from '../features/tasks/Tasks';

export default function Home() {


    return (
        <>
            <NavBar />
            <main className='container mx-auto px-4 py-8 max-w-7xl'>
                <div className='space-y-6'>
                    <AddTaskButton />
                    <div className='md:hidden block'><SearchBar /></div>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <PriorityFilter />
                        <SelectFilter />
                    </div>
                    <Statistics />
                    <Tasks />
                </div>
            </main>
        </>
    )
}
