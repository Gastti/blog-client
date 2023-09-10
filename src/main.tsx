import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />
//   },
//   {
//     path: "/post/create",
//     element: <CreatePost />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ThemeContextProvider>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeContextProvider> */}
    <App />
  </React.StrictMode>,
)