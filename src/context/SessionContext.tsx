import React, { useState, createContext, useEffect } from 'react'
import { Tokens, User } from '../types'
import { getMyUser } from '../services/user'
import { refreshSession } from '../services/auth'
import { handleTokens } from '../utils/handleTokens'

interface SessionContextValues {
  user: User | null
  isLogged: boolean
  isWriter: boolean
  isAdmin: boolean
  tokens: Tokens
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  setIsWriter: React.Dispatch<React.SetStateAction<boolean>>
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
  setTokens: React.Dispatch<React.SetStateAction<Tokens>>
}

export const SessionContext = createContext<SessionContextValues>({} as SessionContextValues)

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({} as User)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isWriter, setIsWriter] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
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
      getMyUser(newTokens.access)
        .then(response => {
          setUser(response.data.data)
          setIsWriter(response.data.data.role === 'writer')
          setIsAdmin(response.data.data.role === 'admin')
          setIsLogged(true)
        })
        .catch(() => {
          refreshSession(getRefreshToken)
            .then(response => {
              setTokens(response.data.data)
              handleTokens(response.data.data.access, response.data.data.refresh)
            })
            .catch(error => console.log('Refresh Session Error:', error))
        })
    }
  }, [])

  const values = {
    user,
    isLogged,
    isWriter,
    isAdmin,
    tokens,
    setUser,
    setIsLogged,
    setIsWriter,
    setIsAdmin,
    setTokens
  }
  return (
    <SessionContext.Provider value={values}>
      {children}
    </SessionContext.Provider>
  )
}