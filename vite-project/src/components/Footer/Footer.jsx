import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../index'

function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-[#f2f0e9]">
      <Container>
        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="font-serif text-lg font-bold tracking-tight text-stone-900">fieldnotes<span className="text-[#416b4d]">.</span></Link>
            <p className="mt-1 text-sm text-stone-500">A little space for ideas worth sharing.</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-stone-500">
            <Link className="transition-colors hover:text-stone-900" to="/">Read stories</Link>
            <Link className="transition-colors hover:text-stone-900" to="/add-post">Write a post</Link>
            <span>© {new Date().getFullYear()} Fieldnotes</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
