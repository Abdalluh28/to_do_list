import { Box } from '@untitledui/icons';
import { Button } from 'flowbite-react';
import { TextField } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import { updateCurrentUser } from '../services/apiUser';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from './Spinner';

export default function ProfileEdit({ onClose }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const defaultValues = {
        firstName: user?.user_metadata?.name.split(' ')[0] || '',
        lastName: user?.user_metadata?.name.split(' ')[1] || '',
    }
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const res = await updateCurrentUser({
            name: data.firstName + ' ' + data.lastName,
            password: data.password
        });

        if (res) {
            const updatedUser = { ...user, user_metadata: { name: data.firstName + ' ' + data.lastName }, };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            toast.success('Profile updated successfully');
            onClose();
        } else {
            toast.error('Error updating profile');
        }
        setIsLoading(false);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col gap-4 rounded-2xl shadow shadow-gray-300 p-5 m-5 sm:w-[400px]">
            <p className="self-center text-xl">Update your profile</p>


            <div>
                <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <input type="text" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    defaultValue={defaultValues.firstName}
                    {...register('firstName', { required: true })} />
                {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div>
                <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <input type="text" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    defaultValue={defaultValues.lastName}
                    {...register('lastName', { required: true })} />
                {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>


            <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    placeholder='*********'
                    {...register('password', {
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }
                    })} />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
                <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="text" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    placeholder='*********'
                    {...register('confirmPassword', {
                        minLength: {
                            value: 6,
                            message: 'confirmPassword must be at least 6 characters'
                        },
                        validate: (value) => value === watch('password') || 'Passwords do not match'
                    })} />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end mt-3">
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">Cancel</button>
                <button type="submit" className="bg-red-500 hover:bg-red-600 transition-all duration-300 p-2 rounded-full w-[100px] cursor-pointer text-white text-lg">
                    {isLoading ? <Spinner /> : 'Save'}
                </button>
            </div>
        </form>
    )
}
