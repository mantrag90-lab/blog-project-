import React, {useId} from 'react'

function Select({
  options,
  label,
  className,
  ...props
},ref) {
const id = useId()
  return (
    <div className='w-full' >
      { label && <label htmlFor={id} className='mb-2 inline-block text-sm font-semibold text-stone-700'>{label}</label>}
      <select
      {...props}
      id ={id}
      ref = {ref}
      className={`w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#789174] focus:ring-4 focus:ring-[#416b4d]/10 ${className || ""}`}
      >
{
  options?.map((option)=>(
    <option key = {option} value= {option}>
      {option}
    </option>
  ))
}
      </select>
      
    </div>
  )
}

export default React.forwardRef (Select)
