import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-purple-100 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-200 transition-shadow duration-200'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold text-purple-900'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard