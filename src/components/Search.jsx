import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from './filterSlice';

export default function Search() {

    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    // debounce logic
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleDebounce = useCallback(
        debounce((value) => {
            setSearchValue(value);
            dispatch(setSearch(value));
            console.log(searchValue)
        }, 500),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        handleDebounce(value);
        setInputValue(value);
    }


    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Tasks"
                inputProps={{ 'aria-label': 'search Tasks' }}
                onChange={handleChange}
                value={inputValue}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>

        </Paper>
    );
}
