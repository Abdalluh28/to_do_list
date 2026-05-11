import { Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Spinner from '../../components/Spinner';

import AuthHeader from './AuthHeader';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';

import { useRegister } from './useRegister';

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { registerHandler, isLoading } = useRegister({ reset });

    const onSubmit = (data) => registerHandler(data);

    return (
        <div className='space-y-8'>

            <AuthHeader
                title='Create your account'
                subtitle='Get started with TaskFlow today'
            />

            <form
                className='space-y-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <AuthInput
                    id='name'
                    label='Full Name'
                    type='text'
                    placeholder='John Doe'
                    icon={<User />}
                    register={register('name', {
                        required: 'Name is required',
                    })}
                    error={errors.name?.message}
                />

                <AuthInput
                    id='email'
                    label='Email'
                    type='email'
                    placeholder='john@example.com'
                    icon={<Mail />}
                    register={register('email', {
                        required: 'Email is required',
                    })}
                    error={errors.email?.message}
                />

                <PasswordInput
                    register={register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                    error={errors.password?.message}
                />

                <button
                    type='submit'
                    className='inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-10 px-4 w-full cursor-pointer'
                >
                    {isLoading ? <Spinner /> : 'Sign Up'}
                </button>

                <p className='text-center text-sm text-muted-foreground'>
                    Already have an account?

                    <Link
                        to='/login'
                        className='text-primary hover:underline ml-1'
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}