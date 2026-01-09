// src/pages/PostPage.tsx
import { useParams } from '@tanstack/react-router'
import { usePost } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import { Link } from '@tanstack/react-router'

export default function PostPage() {
  const { postId } = useParams({ from: '/posts/$postId' })
  const { post, loading, error } = usePost(parseInt(postId))
  const { user } = useAuth()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">
          ← Back to Posts
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">{error || 'Post not found'}</p>
        </div>
      </div>
    )
  }

  const canEdit = user && (user.id === post.userId || user.isAdmin)

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">
        ← Back to Posts
      </Link>
      <article className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          {canEdit && (
            <Link
              to="/posts/$postId/edit"
              params={{ postId: post.id.toString() }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Edit Post
            </Link>
          )}
        </div>
        <div className="text-gray-500 mb-8">
          <span className="font-medium">By User {post.userId}</span>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {post.body}
          </p>
        </div>
      </article>
    </div>
  )
}