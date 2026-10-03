import React ,{useEffect,useState}from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import {useNavigate, useParams} from 'react-router-dom'
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-10 sm:py-14'>
        <Container>
            <div className="mb-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-[#416b4d]">Your story</p><h1 className="font-serif text-4xl font-medium tracking-tight text-stone-900">Edit story</h1></div>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
