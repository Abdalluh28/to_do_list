import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectButton({ value, onChange }) {
    return (
        <FormControl fullWidth>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
                labelId="priority-select-label"
                id="priority-select"
                value={value}
                label="Priority"
                onChange={onChange}
            >
                <MenuItem value={'low'}>Low</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'high'}>High</MenuItem>
            </Select>
        </FormControl>
    );
}
