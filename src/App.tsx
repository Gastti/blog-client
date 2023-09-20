import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import CreatePostPage from './pages/Posts/Create/CreatePostPage'
import Search from './pages/Search/Search'
import Explore from './pages/Explore/Explore'
import ReadPost from './pages/Posts/Read/ReadPost'
import RegisterPage from './pages/Auth/Register/RegisterPage'
import LoginPage from './pages/Auth/Login/LoginPage'
import { SessionContextProvider } from './context/SessionContext'
import EditPost from './pages/Posts/Edit/EditPost'
import MePage from './pages/Users/Me/MePage'

function App() {
  return (
    <HashRouter>
      <SessionContextProvider>
        <ThemeContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
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
  )
}

export default App
