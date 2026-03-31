'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'agent' | 'broker'
  company?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, name: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // API call would go here
      // For demo, create a mock user
      await new Promise(resolve => setTimeout(resolve, 500))
      setUser({
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'agent',
        company: 'Demo Company'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, name: string, password: string) => {
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 500))
      setUser({
        id: '1',
        email,
        name,
        role: 'agent',
        company: 'Demo Company'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
