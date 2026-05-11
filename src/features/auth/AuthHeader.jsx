import { SquareCheckBig } from 'lucide-react';

export default function AuthHeader({ title, subtitle }) {
    return (
        <div className='space-y-8'>
            <div className='flex items-center gap-2'>
                <span className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
                    <SquareCheckBig className='text-white w-6 h-6' />
                </span>

                <span className='font-semibold text-xl'>
                    TaskFlow
                </span>
            </div>

            <div>
                <h1 className='text-3xl mb-2'>{title}</h1>
                <p className='text-muted-foreground'>{subtitle}</p>
            </div>
        </div>
    );
}