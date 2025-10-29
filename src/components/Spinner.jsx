import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Spinner() {
    return (
        <div className='flex justify-center items-center'>
            <CircularProgress size={24} color="inherit" />
        </div>
    )
}
