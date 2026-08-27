import React from 'react'

function Logo({width = '100px'}) {
  return (
    <span style={{ width }} className="inline-block font-bold text-xl text-purple-200">Blog</span>
  )
}

export default Logo
