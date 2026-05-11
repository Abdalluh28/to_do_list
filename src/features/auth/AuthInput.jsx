export default function AuthInput({
    id,
    label,
    type = 'text',
    placeholder,
    icon,
    register,
    error,
}) {
    return (
        <div className='w-full'>
            <label
                htmlFor={id}
                className='block mb-2 text-foreground/90'
            >
                {label}
            </label>

            <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                    {icon}
                </div>

                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className='w-full h-11 px-4 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed pl-10'
                    {...register}
                />
            </div>

            {error && (
                <p className='text-red-600 mt-1'>
                    {error}
                </p>
            )}
        </div>
    );
}