// src/App.tsx
import { Link, Outlet } from '@tanstack/react-router'
import { AuthProvider } from './contexts/AuthContext'
import  { useAuth} from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  )
}

function Header() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MyBlog
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/posts/new" className="text-gray-600 hover:text-gray-900">
                New Post
              </Link>
              <span className="text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default App