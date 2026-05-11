import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Calendar } from 'lucide-react';

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
        <div className="flex items-center gap-1">
            <input
                type="text"
                value={date.format('DD MMM YYYY')}
                readOnly
                className="w-full h-11 px-4 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div
                className='hover:bg-accent hover:text-accent-foreground p-2 rounded-full transition duration-300 cursor-pointer'
                onClick={handleOpen}>
                <Calendar />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    },
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'var(--popover)',
                        color: 'var(--popover-foreground)',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid var(--border)',
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
                                    sx: {
                                        '& .MuiButton-root': {
                                            color: 'var(--primary)',
                                            borderRadius: 'var(--radius)',
                                            '&:hover': {
                                                backgroundColor: 'var(--accent)',
                                            },
                                        },
                                    },
                                },
                            }}
                            sx={{
                                bgcolor: 'var(--popover)',
                                color: 'var(--popover-foreground)',
                                borderRadius: 2,
                                overflow: 'hidden',
                                '& .MuiPickersLayout-root': {
                                    bgcolor: 'var(--popover)',
                                    color: 'var(--popover-foreground)',
                                },
                                '& .MuiPickersToolbar-root': {
                                    bgcolor: 'var(--popover)',
                                    color: 'var(--popover-foreground)',
                                    borderBottom: '1px solid var(--border)',
                                },
                                '& .MuiPickersToolbar-content, & .MuiPickersToolbarText-root': {
                                    color: 'var(--popover-foreground)',
                                },
                                '& .MuiDateCalendar-root': {
                                    bgcolor: 'var(--popover)',
                                    color: 'var(--popover-foreground)',
                                },
                                '& .MuiPickersCalendarHeader-root': {
                                    color: 'var(--popover-foreground)',
                                },
                                '& .MuiPickersCalendarHeader-label': {
                                    color: 'var(--popover-foreground)',
                                },
                                '& .MuiPickersArrowSwitcher-button': {
                                    color: 'var(--popover-foreground)',
                                    '&:hover': {
                                        bgcolor: 'var(--accent)',
                                    },
                                    '&.Mui-disabled': {
                                        color: 'var(--muted-foreground)',
                                        opacity: 0.45,
                                    },
                                },
                                '& .MuiDayCalendar-weekDayLabel': {
                                    color: 'var(--muted-foreground)',
                                },
                                '& .MuiPickersDay-root': {
                                    color: 'var(--popover-foreground)',
                                    borderRadius: 'var(--radius)',
                                    '&:hover': {
                                        bgcolor: 'var(--accent)',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'var(--primary)',
                                        color: 'var(--primary-foreground)',
                                        '&:hover, &:focus': {
                                            bgcolor: 'var(--primary)',
                                        },
                                    },
                                    '&.MuiPickersDay-today': {
                                        borderColor: 'var(--primary)',
                                    },
                                    '&.Mui-disabled': {
                                        color: 'var(--muted-foreground)',
                                        opacity: 0.45,
                                    },
                                },
                                '& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton': {
                                    color: 'var(--popover-foreground)',
                                    borderRadius: 'var(--radius)',
                                    '&:hover': {
                                        bgcolor: 'var(--accent)',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'var(--primary)',
                                        color: 'var(--primary-foreground)',
                                        '&:hover, &:focus': {
                                            bgcolor: 'var(--primary)',
                                        },
                                    },
                                    '&.Mui-disabled': {
                                        color: 'var(--muted-foreground)',
                                        opacity: 0.45,
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    );
}
