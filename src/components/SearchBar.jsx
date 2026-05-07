import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from './FilterSlice';
import { Search } from 'lucide-react';

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const debounceRef = useRef();

    // debounce logic
    const handleDebounce = (value) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setSearchValue(value);
            dispatch(setSearch(value));
            console.log(searchValue)
        }, 500);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        handleDebounce(value);
        setInputValue(value);
    }


    return (
        <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
            <input type='text' value={inputValue} onChange={handleChange}
                placeholder='Search tasks'
                className='w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all' />
        </div>
    );
}
