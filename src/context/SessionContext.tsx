import React, { useState, createContext, useEffect } from 'react'
import { User } from '../types'
import { getMyUser } from '../services/user'
import { refresh } from '../services/auth'

interface SessionContextValues {
  user: User | null
  isLogged: boolean
  isWriter: boolean
  isAdmin: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  setIsWriter: React.Dispatch<React.SetStateAction<boolean>>
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

export const SessionContext = createContext<SessionContextValues>({} as SessionContextValues)

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({} as User)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isWriter, setIsWriter] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const handleSession = async () => {
    if (localStorage.access) {
      const expirationTime = parseInt(localStorage.accessExpiration)
      const currentTime = Date.now() / 1000;
      console.log('Verificando Token')
      if (expirationTime - currentTime < 60) {
        console.log('Token Vencido')
        const refreshedToken = await refresh(localStorage.refresh)
        console.log('Check Get 1', refreshedToken)
        if (refreshedToken) {
          localStorage.access = refreshedToken.data.data.access
          localStorage.accessExpiration = refreshedToken.data.data.accessExpiration
        }
      }

      const getUser = await getMyUser(localStorage.access)
      console.log('Check Get 2', getUser)
      if (getUser) {
        const user = getUser.data.data
        setUser(user)
        setIsWriter(user.role === 'writer')
        setIsAdmin(user.role === 'admin')
        setIsLogged(true)
      }
    }
  }

  useEffect(() => {
    handleSession()
  }, [])

  const values = {
    user,
    isLogged,
    isWriter,
    isAdmin,
    setUser,
    setIsLogged,
    setIsWriter,
    setIsAdmin,
  }
  return (
    <SessionContext.Provider value={values}>
      {children}
    </SessionContext.Provider>
  )
}