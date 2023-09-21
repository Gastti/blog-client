import React, { useState, createContext, useEffect } from 'react'
import { User } from '../types'
import useAxios from '../hooks/useAxios'

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
  const api = useAxios()
  const [user, setUser] = useState<User | null>({} as User)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isWriter, setIsWriter] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const handleSession = async () => {
    const response = await api.get('/users/me')
    if (response.status === 200) {
      const user = response.data.data
      setUser(user)
      setIsWriter(user.role === 'writer')
      setIsAdmin(user.role === 'admin')
      setIsLogged(true)
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