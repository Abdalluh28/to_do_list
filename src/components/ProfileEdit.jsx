import { Lock, User, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Spinner from './Spinner';
import { updateCurrentUser } from '../services/apiUser';

export default function ProfileEdit({ onClose }) {

    const user = JSON.parse(localStorage.getItem('user'));

    const defaultValues = {
        firstName: user?.user_metadata?.name?.split(' ')[0] || '',
        lastName: user?.user_metadata?.name?.split(' ')[1] || '',
        password: '',
        confirmPassword: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({ defaultValues });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        const res = await updateCurrentUser({
            name: `${data.firstName} ${data.lastName}`,
            password: data.password || undefined,
        });

        if (res) {
            const updatedUser = {
                ...user,
                user_metadata: {
                    ...user.user_metadata,
                    name: `${data.firstName} ${data.lastName}`,
                },
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success('Profile updated successfully');

            onClose();
        } else {
            toast.error('Error updating profile');
        }

        setIsLoading(false);
        reset(defaultValues);
    };

    return (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 focus:outline-none'>

            {/* Header */}
            <div className='mb-6'>
                <p className='text-xl mb-2 text-foreground'>
                    Update Profile
                </p>

                <p className='text-muted-foreground'>
                    Update your personal information and password
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4'
            >

                {/* First & Last Name */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                    {/* First Name */}
                    <div>
                        <label
                            htmlFor='firstName'
                            className='block mb-2 text-foreground/90'
                        >
                            First Name
                        </label>

                        <div className='relative'>
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                                <User className='w-4 h-4' />
                            </div>

                            <input
                                type='text'
                                id='firstName'
                                placeholder='John'
                                className='w-full h-11 px-4 pl-10 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200'
                                {...register('firstName', {
                                    required: 'First name is required',
                                })}
                            />
                        </div>

                        {errors.firstName && (
                            <span className='ml-2 text-red-600 text-sm'>
                                {errors.firstName.message}
                            </span>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor='lastName'
                            className='block mb-2 text-foreground/90'
                        >
                            Last Name
                        </label>

                        <div className='relative'>
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                                <User className='w-4 h-4' />
                            </div>

                            <input
                                type='text'
                                id='lastName'
                                placeholder='Doe'
                                className='w-full h-11 px-4 pl-10 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200'
                                {...register('lastName', {
                                    required: 'Last name is required',
                                })}
                            />
                        </div>

                        {errors.lastName && (
                            <span className='ml-2 text-red-600 text-sm'>
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor='password'
                        className='block mb-2 text-foreground/90'
                    >
                        New Password
                    </label>

                    <div className='relative'>
                        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                            <Lock className='w-4 h-4' />
                        </div>

                        <input
                            type='password'
                            id='password'
                            placeholder='••••••••'
                            className='w-full h-11 px-4 pl-10 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200'
                            {...register('password', {
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                    </div>

                    {errors.password && (
                        <span className='ml-2 text-red-600 text-sm'>
                            {errors.password.message}
                        </span>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor='confirmPassword'
                        className='block mb-2 text-foreground/90'
                    >
                        Confirm Password
                    </label>

                    <div className='relative'>
                        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                            <Lock className='w-4 h-4' />
                        </div>

                        <input
                            type='password'
                            id='confirmPassword'
                            placeholder='••••••••'
                            className='w-full h-11 px-4 pl-10 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200'
                            {...register('confirmPassword', {
                                validate: (value) =>
                                    value === watch('password') ||
                                    'Passwords do not match',
                            })}
                        />
                    </div>

                    {errors.confirmPassword && (
                        <span className='ml-2 text-red-600 text-sm'>
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className='flex justify-end gap-3 pt-4'>

                    <button
                        type='button'
                        onClick={onClose}
                        className='inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground h-10 px-4'
                    >
                        Cancel
                    </button>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-10 px-4'
                    >
                        {isLoading ? <Spinner /> : 'Save Changes'}
                    </button>
                </div>
            </form>

            {/* Close Button */}
            <button
                className='absolute right-4 top-4 p-2 rounded-lg hover:bg-accent transition-colors'
                onClick={onClose}
            >
                <X className='w-4 h-4' />
            </button>
        </div>
    );
}