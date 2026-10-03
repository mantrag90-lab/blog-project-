import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='mb-2 inline-block text-sm font-semibold text-stone-700' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#789174] focus:ring-4 focus:ring-[#416b4d]/10 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
