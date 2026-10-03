import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = useSelector((state) => state.auth.userData?.$id)

  useEffect(() => {
    let active = true
    setLoading(true)
    setPosts([])

    appwriteService.getPostsByUser(userId).then((result) => {
      if (active && result) setPosts(result.documents)
    }).finally(() => {
      if (active) setLoading(false)
    })

    return () => { active = false }
  }, [userId])

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-9 border-b border-stone-200 pb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-[#416b4d]">Your collection</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="font-serif text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">My posts</h1><p className="mt-3 text-stone-500">Stories you’ve written and published.</p></div>
            <span className="text-sm text-stone-400">{posts.length} {posts.length === 1 ? 'story' : 'stories'}</span>
          </div>
        </div>
        {loading ? <p className="py-16 text-center text-stone-500">Gathering the stories…</p> : posts.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <PostCard key={post.$id} {...post} onDelete={(deletedId) => setPosts((current) => current.filter((item) => item.$id !== deletedId))} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e6ece3] font-serif text-2xl text-[#416b4d]">✳</span>
            <h2 className="mt-5 font-serif text-2xl text-stone-900">Your first story is waiting</h2>
            <p className="mt-2 text-stone-500">Start with an idea you can’t stop thinking about.</p>
            <Link to="/add-post" className="mt-6 inline-flex rounded-full bg-[#416b4d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#34563e]">Write your first blog <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        )}
      </Container>
    </section>
  )
}

export default AllPosts
