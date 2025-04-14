import { createContext, useContext, useState, ReactNode } from 'react'
import { login as apiLogin } from '../services/AuthService'

interface AuthContextType {
  user: string | null
  token: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => 
    localStorage.getItem('user') || null
  )
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('token') || null
  )

  const login = async (username: string, password: string) => {
    try {
      const { token } = await apiLogin(username, password)
      setUser(username)
      setToken(token)
      localStorage.setItem('user', username)
      localStorage.setItem('token', token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
  }

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}