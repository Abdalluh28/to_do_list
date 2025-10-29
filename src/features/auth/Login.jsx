import { Box, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import img from '../../assets/img.png'
import { useLogin } from './useLogin'
import Spinner from '../../components/Spinner'

export default function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { loginHandler, isLoading } = useLogin({ reset })
    const onSubmit = (data) => loginHandler(data);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="flex w-full max-w-5xl shadow-lg rounded-xl overflow-hidden bg-white">

                {/* 🖼️ Left side - Image */}
                <div className="hidden md:flex w-1/2  justify-center items-center p-6">
                    <img
                        src={img}
                        alt="Login illustration"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>

                {/* 📝 Right side - Form */}
                <form className="flex w-full md:w-1/2 justify-center items-center p-8"
                    onSubmit={handleSubmit(onSubmit)}>
                    <Paper elevation={0} className="w-full max-w-sm flex flex-col gap-6 bg-transparent">
                        <Typography variant="h4" className="font-bold text-gray-800 self-center">
                            Login
                        </Typography>

                        <div className='flex flex-col items-start'>
                            <Box sx={{ width: '100%', my: 1 }}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    {...register('email', { required: true })}
                                />
                            </Box>
                            {errors.email && <p className="text-red-600">Email is required</p>}
                        </div>

                        <div className='flex flex-col items-start'>
                            <Box sx={{ width: '100%', my: 1 }}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    {...register('password', { required: true })}
                                />
                            </Box>
                            {errors.password && <p className="text-red-600">Password is required</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg py-3 text-lg font-semibold text-white shadow-md cursor-pointer"
                        >
                            {isLoading ? <Spinner /> : 'Login'}
                        </button>

                        <div className="flex items-center gap-1 text-sm mt-2">
                            <p className="text-gray-600">Don’t have an account?</p>
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    </Paper>
                </form>
            </div>
        </div>
    )
}
