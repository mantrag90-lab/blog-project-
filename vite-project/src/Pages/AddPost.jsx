import React from 'react'
import {Container ,PostForm} from '../components'

function AddPost() {
  return (
    <div className='py-10 sm:py-14'>
        <Container>
            <div className="mb-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-[#416b4d]">Make something worth reading</p><h1 className="font-serif text-4xl font-medium tracking-tight text-stone-900">Write a story</h1></div>
            <PostForm/>
        </Container>
      
    </div>
  )
}

export default AddPost
