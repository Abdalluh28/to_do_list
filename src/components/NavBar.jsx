import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Search from './Search';

export default function NavBar() {
    return (
        <div className='flex p-4 flex-col sm:flex-row gap-4 '>
            <div className='flex gap-2'>
                <ChecklistRtlIcon sx={{ color: '#FF0000', mt: 0.5 }} />
                <h1 className='text-2xl font-semibold tracking-widest'>AckiTask</h1>
            </div>
            <div className='flex gap-2 sm:ml-auto self-center'>
                <Search />
            </div>
        </div>
    )
}
