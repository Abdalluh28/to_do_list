import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Auth from './Auth'
import { useLogin } from './useLogin'
import AuthHeader from './AuthHeader'
import AuthInput from './AuthInput'
import PasswordInput from './PasswordInput'
import AuthLayout from './AuthLayout'

export default function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { loginHandler, isLoading } = useLogin({ reset })
    const onSubmit = (data) => loginHandler(data);


    return (
        <div className='space-y-8'>
            <AuthHeader
                title='Welcome back'
                subtitle='Sign in to your account to continue'
            />

            <form
                className='space-y-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <AuthInput
                    id='email'
                    label='Email'
                    type='email'
                    placeholder='john@example.com'
                    icon={<Mail />}
                    register={register('email', {
                        required: 'Email is required'
                    })}
                    error={errors.email?.message}
                />

                <PasswordInput
                    register={register('password', {
                        required: 'Password is required'
                    })}
                    error={errors.password?.message}
                />


                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-10 px-4 w-full cursor-pointer"
                >
                    {isLoading ? <Spinner /> : 'Sign In'}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    Don’t have an account?
                    <Link
                        to="/register"
                        className="text-primary hover:underline ml-1"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    )
}
