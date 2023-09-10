import { useState, createContext } from 'react'

interface ThemeContextValues {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextValues>({} as ThemeContextValues)

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState('dark-mode')

  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = theme === 'light-mode' ? '#fff' : '#101010'
    body.style.color = theme === 'light-mode' ? '#101010' : '#f1f1f1'
  }

  const values = { theme, setTheme }
  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
}