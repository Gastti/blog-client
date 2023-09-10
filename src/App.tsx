import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Home from './routes/Home/Home'
import CreatePost from './routes/Posts/CreatePost'
import Search from './routes/Search/Search'
import Explore from './routes/Explore/Explore'

function App() {
  return (
    <HashRouter>
      <ThemeContextProvider>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path='/post/create' element={<CreatePost />} />
        </Routes>
      </ThemeContextProvider>
    </HashRouter>
  )
}

export default App
