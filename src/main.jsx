import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import{ AuthLayout }from '../components/index.js'

import Home from './pages/Home.jsx'
import LoginC from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'

//To create direct export method write ffc and enter it the boiler code generates

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <LoginC/>
          </AuthLayout>
        )
      },
      {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <Signup />
              </AuthLayout>
          ),
      },
      {
          path: "/all-posts",
          element: (
            //means authentication true
              <AuthLayout authentication>
                  {" "}
                  <AllPosts />
              </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
