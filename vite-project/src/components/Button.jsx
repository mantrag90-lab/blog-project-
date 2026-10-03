import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-[#416b4d]',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button type={type} className={`rounded-full px-5 py-2.5 text-sm font-semibold ${bgColor} ${textColor} ${className} transition duration-200 hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`} {...props}>
      {children}
    </button>
  )
}

export default Button
