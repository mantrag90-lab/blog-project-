import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result) setPosts(result.documents)
    })
  }, [])

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f2f0e9]">
        <Container>
          <div className="relative grid min-h-[390px] items-center gap-10 py-16 md:grid-cols-[1.3fr_.7fr] md:py-20">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[#416b4d]"><span className="h-px w-7 bg-[#416b4d]" />Independent writing, made personal</p>
              <h1 className="max-w-xl font-serif text-5xl font-medium leading-[1.08] tracking-[-.045em] text-stone-900 sm:text-6xl">Good stories make room to <span className="text-[#416b4d]">think.</span></h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">A welcoming place for thoughtful writing, fresh perspectives, and the ideas we keep coming back to.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#latest" className="rounded-full bg-[#416b4d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#34563e]">Explore the stories <span aria-hidden="true">→</span></a>
                {authStatus ? <Link to="/add-post" className="text-sm font-semibold text-stone-700 transition hover:text-[#416b4d]">Share an idea <span aria-hidden="true">↗</span></Link> : <Link to="/signup" className="text-sm font-semibold text-stone-700 transition hover:text-[#416b4d]">Join the community <span aria-hidden="true">↗</span></Link>}
              </div>
            </div>
            <div className="relative mx-auto hidden h-64 w-64 items-center justify-center md:flex lg:h-72 lg:w-72">
              <div className="absolute inset-0 rotate-[-8deg] rounded-[46%_54%_58%_42%/45%_42%_58%_55%] bg-[#dce4d8]" />
              <div className="absolute inset-7 rotate-[8deg] rounded-[55%_45%_43%_57%/52%_56%_44%_48%] border border-[#b7c7b2]" />
              <div className="relative -rotate-3 text-center font-serif text-7xl leading-none text-[#416b4d]">“<span className="block text-2xl italic">stay curious</span>”</div>
              <span className="absolute right-2 top-8 h-3 w-3 rounded-full bg-[#c99c66]" />
              <span className="absolute bottom-3 left-6 h-2 w-2 rounded-full bg-[#416b4d]" />
            </div>
          </div>
        </Container>
      </section>

      <section id="latest" className="py-14 sm:py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-[#416b4d]">The reading room</p>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">Latest stories</h2>
            </div>
            {posts.length > 0 && <span className="pb-1 text-sm text-stone-500">{posts.length} {posts.length === 1 ? 'story' : 'stories'} to explore</span>}
          </div>
          {posts.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => <PostCard key={post.$id} {...post} featured={index === 0} />)}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e6ece3] font-serif text-2xl text-[#416b4d]">✳</span>
              <h3 className="mt-5 font-serif text-2xl text-stone-900">Your reading list starts here</h3>
              <p className="mx-auto mt-2 max-w-md leading-7 text-stone-500">There aren’t any stories yet. Check back soon, or be the first to share an idea.</p>
              {authStatus && <Link to="/add-post" className="mt-6 inline-flex rounded-full bg-[#416b4d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#34563e]">Write the first story</Link>}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default Home
