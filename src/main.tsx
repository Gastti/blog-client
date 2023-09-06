import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from './routes/ProtectedRoute.tsx'
import { Dashboard } from './routes/Dashboard.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { Login } from './routes/Login.tsx'
import App from './App.tsx'
import Post from './routes/Post.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/post/:id",
    element: <Post />
  }
  // {
  //   path: "/",
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />
  //     }
  //   ]
  // }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)