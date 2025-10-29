import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DayPicker({ date, setDate, startDate, endDate }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDateChange = (newDate) => {
        if (!newDate) return;

        // If there's a startDate (end date picker)
        if (startDate && newDate.isBefore(startDate, 'day')) {
            setDate(startDate);
        }
        // If there's an endDate (start date picker)
        else if (endDate && newDate.isAfter(endDate, 'day')) {
            setDate(endDate);
        }
        else {
            setDate(newDate);
        }

        handleClose();
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={date.format('DD MMM YYYY')}
                readOnly
                className="border rounded p-1 w-2/3"
            />
            <IconButton onClick={handleOpen}>
                <CalendarTodayIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        minWidth: 300,
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            value={date}
                            onChange={handleDateChange}
                            shouldDisableDate={(day) => {
                                // Disable invalid dates directly in the UI
                                if (startDate && day.isBefore(startDate, 'day')) return true;
                                if (endDate && day.isAfter(endDate, 'day')) return true;
                                return false;
                            }}
                            slotProps={{
                                actionBar: {
                                    actions: ['today'],
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    );
}
