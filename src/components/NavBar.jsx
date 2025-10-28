import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

export default function NavBar() {
    return (
        <div className='flex items-center p-4'>
            <div className='flex items-center justify-center gap-2'>
                <ChecklistRtlIcon sx={{ color: '#FF0000', mt: 0.5 }} />
                <h1 className='text-2xl font-semibold tracking-widest'>AckiTask</h1>
            </div>
        </div>
    )
}
