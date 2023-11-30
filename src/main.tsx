import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AlertContextProvider } from './context/AlertContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AlertContextProvider>
    <App />
  </AlertContextProvider>
)