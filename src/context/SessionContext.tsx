import React, { useState, createContext, useEffect } from 'react'
import { Tokens, User } from '../types'
import { getMyUser } from '../services/user'

interface SessionContextValues {
  user: User
  isLogged: boolean
  isWriter: boolean
  tokens: Tokens
  setUser: React.Dispatch<React.SetStateAction<User>>
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  setIsWriter: React.Dispatch<React.SetStateAction<boolean>>
  setTokens: React.Dispatch<React.SetStateAction<Tokens>>
}

export const SessionContext = createContext<SessionContextValues>({} as SessionContextValues)

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isWriter, setIsWriter] = useState<boolean>(false)
  const [tokens, setTokens] = useState({
    access: '',
    refresh: ''
  })

  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken")
    const getRefreshToken = localStorage.getItem("refreshToken")

    if (getAccessToken !== null && getRefreshToken !== null) {
      const newTokens = { access: getAccessToken, refresh: getRefreshToken }
      setTokens(newTokens)
      getMyUser(getAccessToken)
        .then(response => {
          console.log('Session Context, getMyUser', response)
          setUser(response.data.data)
          setIsWriter(response.data.data.role === 'writer')
          setIsLogged(true)
        })
        .catch(error => console.log('Session Context, getMyUser', error))
    }
  }, [])

  const values = {
    user,
    isLogged,
    isWriter,
    tokens,
    setUser,
    setIsLogged,
    setIsWriter,
    setTokens
  }
  return (
    <SessionContext.Provider value={values}>
      {children}
    </SessionContext.Provider>
  )
}