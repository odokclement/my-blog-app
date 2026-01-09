// src/types/index.ts
export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface User {
  id: number
  username: string
  isAdmin: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
}