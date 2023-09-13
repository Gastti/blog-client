import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import CreatePost from './pages/Posts/Create/CreatePost'
import Search from './pages/Search/Search'
import Explore from './pages/Explore/Explore'
import ReadPost from './pages/Posts/Read/ReadPost'
import RegisterPage from './pages/Auth/Register/RegisterPage'

function App() {
  return (
    <HashRouter>
      <ThemeContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path='/posts/create' element={<CreatePost />} />
          <Route path='/read' element={<ReadPost />} />
          <Route path='/auth/register' element={<RegisterPage />} />
        </Routes>
      </ThemeContextProvider>
    </HashRouter>
  )
}

export default App
