import React, { useContext, createContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext({
  isAuthenticated: false
})

export function AuthProvider({children}: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState()

  return (
    <AuthContext.Provider value={{isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)