import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PasswordInput({
    register,
    error,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='relative'>
            <label
                htmlFor='password'
                className='block mb-2 text-foreground/90'
            >
                Password
            </label>

            <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                    <Lock />
                </div>

                <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='w-full h-11 px-4 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed pl-10 pr-10'
                    {...register}
                />

                <button
                    type='button'
                    onClick={() => setShowPassword(prev => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>

            {error && (
                <p className='text-red-600 mt-1'>
                    {error}
                </p>
            )}
        </div>
    );
}