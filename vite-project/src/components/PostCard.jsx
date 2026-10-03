import React, { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '.'

function getExcerpt(content = '') {
  const text = content.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim()
  return text.length > 145 ? `${text.slice(0, 145).trim()}…` : text
}

function PostCard({ $id, title, content, featuredImages, featuredImage, image, imageUrl, userid, onDelete, featured = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = userData && userid === userData.$id
  const imageValue = featuredImages || featuredImage || image || imageUrl
  const previewUrl = imageValue ? appwriteService.getFilePreview(imageValue) : undefined
  const excerpt = getExcerpt(content)
  const wordCount = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const deletePost = async () => {
    if (!isAuthor || deleting || !window.confirm(`Delete “${title}”? This cannot be undone.`)) return
    setDeleting(true)
    try {
      const deleted = await appwriteService.deletePost($id)
      if (deleted) {
        if (imageValue && !/^https?:\/\//i.test(imageValue)) await appwriteService.deleteFile(imageValue)
        onDelete?.($id)
        navigate('/all-posts')
      }
    } catch (error) {
      console.error('PostCard :: deletePost :: error', error)
      window.alert('Could not delete this post. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_44px_-28px_rgba(41,45,36,.32)] ${featured ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_.95fr]' : ''}`}>
      <Link to={`/post/${$id}`} className={`relative block overflow-hidden bg-[#eceae3] ${featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[320px]' : 'aspect-[16/10]'}`}>
        {previewUrl && !imageFailed ? <img src={previewUrl} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" onError={() => setImageFailed(true)} /> : <div className="grid h-full min-h-48 place-items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#e4e8dc] via-[#efeee8] to-[#e7e1d4]"><span className="font-serif text-6xl text-[#82917d]" aria-label="Image unavailable">✳</span></div>}
        {featured && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#416b4d] backdrop-blur">Editor’s pick</span>}
      </Link>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? 'lg:justify-center lg:p-9' : ''}`}>
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.15em] text-stone-400"><span className="h-1.5 w-1.5 rounded-full bg-[#91a58a]" />Fieldnotes <span className="text-stone-300">/</span> {readingTime} min read</div>
        <Link to={`/post/${$id}`} className="group/title"><h2 className={`font-serif font-medium leading-tight tracking-[-.025em] text-stone-900 transition-colors group-hover/title:text-[#416b4d] ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{title}</h2></Link>
        {excerpt && <p className={`mt-3 leading-7 text-stone-500 ${featured ? 'text-base sm:text-lg' : 'text-sm'}`}>{excerpt}</p>}
        <Link to={`/post/${$id}`} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#416b4d] transition-all hover:gap-3">Read story <span aria-hidden="true">→</span></Link>
        {isAuthor && <div className="mt-auto flex gap-2 border-t border-stone-100 pt-4">
          <Button bgColor="bg-stone-100" textColor="text-stone-700" className="flex-1 hover:bg-stone-200" onClick={() => navigate(`/edit-post/${$id}`)}>Edit</Button>
          <Button bgColor="bg-rose-50" textColor="text-rose-700" className="flex-1 hover:bg-rose-100" onClick={deletePost} disabled={deleting}>{deleting ? 'Deleting…' : 'Delete'}</Button>
        </div>}
      </div>
    </article>
  )
}

export default PostCard
