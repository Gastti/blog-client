import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.tsx'
import CreatePost from './routes/Posts/CreatePost.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'
import Navbar from './components/Navbar/Navbar.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/post/create",
    element: <CreatePost />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>,
)