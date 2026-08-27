import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const AddPost = lazy(() => import('./pages/AddPost.jsx'))
const EditPost = lazy(() => import('./pages/EditPost.jsx'))
const Post = lazy(() => import('./pages/Post.jsx'))
const AllPosts = lazy(() => import('./pages/AllPost.jsx'))

// Loading fallback component
const PageLoader = () => (
  <div className='flex items-center justify-center py-16'>
    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600'></div>
  </div>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
                <Suspense fallback={<PageLoader />}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Suspense fallback={<PageLoader />}>
                        <Signup />
                    </Suspense>
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    <Suspense fallback={<PageLoader />}>
                        <AllPosts />
                    </Suspense>
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    <Suspense fallback={<PageLoader />}>
                        <AddPost />
                    </Suspense>
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    <Suspense fallback={<PageLoader />}>
                        <EditPost />
                    </Suspense>
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: (
                <Suspense fallback={<PageLoader />}>
                    <Post />
                </Suspense>
            ),
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
