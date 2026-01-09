// src/pages/HomePage.tsx
import { useEffect } from 'react'
import { PostCard } from '../components/PostCard'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import { Link } from '@tanstack/react-router'

export default function HomePage() {
  const { posts, loading, fetchPosts, deletePost } = usePosts()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading posts...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Latest Posts</h1>
        {isAuthenticated && (
          <Link
            to="/posts/new"
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
          >
            + New Post
          </Link>
        )}
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts yet. Create the first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={deletePost} />
          ))}
        </div>
      )}
    </div>
  )
}