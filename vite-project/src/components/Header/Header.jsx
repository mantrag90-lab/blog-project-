import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const links = [
    { name: 'Stories', to: '/', show: true },
    { name: 'My posts', to: '/all-posts', show: authStatus },
    { name: 'Write', to: '/add-post', show: authStatus },
    { name: 'Sign in', to: '/login', show: !authStatus },
    { name: 'Get started', to: '/signup', show: !authStatus, primary: true },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#faf9f6]/90 backdrop-blur-xl">
      <Container>
        <nav className="flex min-h-[76px] items-center justify-between gap-5" aria-label="Main navigation">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Fieldnotes home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#416b4d] text-sm font-bold text-white transition-transform group-hover:rotate-[-8deg]">f.</span>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900">fieldnotes</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            {links.filter((item) => item.show).map(({ name, to, primary }) => (
              <NavLink
                key={name}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${primary ? 'bg-[#416b4d] text-white hover:bg-[#34563e]' : isActive ? 'bg-stone-200/70 text-stone-900' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950'}`}
              >{name}</NavLink>
            ))}
            {authStatus && <LogoutBtn />}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
