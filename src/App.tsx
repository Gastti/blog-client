import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'
const Navbar = lazy(() => import('./components/Navbar/Navbar'))
const Home = lazy(() => import('./pages/Home/Home'))
const CreatePostPage = lazy(() => import('./pages/Posts/Create/CreatePostPage'))
const Explore = lazy(() => import('./pages/Explore/Explore'))
const ReadPost = lazy(() => import('./pages/Posts/Read/ReadPost'))
const RegisterPage = lazy(() => import('./pages/Auth/Register/RegisterPage'))
const LoginPage = lazy(() => import('./pages/Auth/Login/LoginPage'))
import { SessionContextProvider } from './context/SessionContext'
const EditPost = lazy(() => import('./pages/Posts/Edit/EditPost'))
const MePage = lazy(() => import('./pages/Users/Me/MePage'))
import Container from './components/Container/Container'
import { useAlert } from './hooks/useAlert'



function App() {
  const { Alerts } = useAlert()
  return (
    <Suspense fallback={<div></div>}>
      <HashRouter>
        <SessionContextProvider>
          <ThemeContextProvider>

            <Navbar />
            <Container><Alerts /></Container>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path='/posts/create' element={<CreatePostPage />} />
              <Route path='/read' element={<ReadPost />} />
              <Route path='/auth/register' element={<RegisterPage />} />
              <Route path='/auth/login/' element={<LoginPage />} />
              <Route path='/edit' element={<EditPost />} />
              <Route path='/users/me' element={<MePage />} />
            </Routes>

          </ThemeContextProvider>
        </SessionContextProvider>
      </HashRouter>
    </Suspense>
  )
}

export default App
