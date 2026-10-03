import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({ userData }));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
        className='mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-8 sm:px-8 sm:py-14'
    >
        <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-7 shadow-[0_20px_60px_-44px_rgba(41,45,36,.3)] sm:p-10">
        <div className="mb-2 flex justify-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#416b4d] font-serif text-2xl font-bold text-white">f.</span>
        </div>
        <h2 className="text-center font-serif text-3xl font-medium leading-tight text-stone-900">Welcome back</h2>
        <p className="mt-2 text-center text-sm text-stone-500">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-[#416b4d] transition-colors hover:text-[#34563e]"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-sm text-rose-700">{error}</p>}
        <form onSubmit={handleSubmit(login, () => setError("Enter a valid email address and password."))} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                    
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
