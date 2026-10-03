import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.error('Could not log out', error)
    }
  }

  return <button type="button" onClick={logoutHandler} className="rounded-full px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 sm:px-4">Sign out</button>
}

export default LogoutBtn
