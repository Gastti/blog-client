import { useState, createContext, useEffect } from 'react'

interface ThemeContextValues {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
  toggleTheme: () => void
}

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextValues>({} as ThemeContextValues)

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState('dark-mode')

  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = theme === 'light-mode' ? '#ffffff' : '#18171c'
    body.style.color = theme === 'light-mode' ? '#18171c' : '#f1f1f1'
  }

  const toggleTheme = () => {
    setTheme(theme === 'light-mode' ? 'dark-mode' : 'light-mode')
    localStorage.setItem('theme', theme === 'light-mode' ? 'dark-mode' : 'light-mode')
  }

  useEffect(() => {
    const selectedTheme = localStorage.getItem('theme')
    if (selectedTheme) setTheme(selectedTheme)
  }, [])

  const values = { theme, setTheme, toggleTheme }
  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
}