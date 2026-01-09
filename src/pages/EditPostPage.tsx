import { useParams, useNavigate } from '@tanstack/react-router'
import { PostForm } from '../components/PostForm'
import { usePost } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'

export default function EditPostPage() {
  const { postId } = useParams({ from: '/posts/$postId/edit' })
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Try calling usePost
  let post, updatePost
  try {
    const result = usePost(parseInt(postId))
    post = result.post
    updatePost = result.updatePost
  } catch (error) {
    console.error('Error with usePost hook:', error)
    return (
      <div className="p-8">
        <p className="text-red-600">Error loading post hook</p>
      </div>
    )
  }

  // Show loading state
  if (!post) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Loading post...</p>
      </div>
    )
  }

  // Check permissions
  const canEdit = user && (user.id === post.userId || user.isAdmin)
  
  if (!canEdit) {
    return (
      <div className="p-8">
        <p className="text-red-600">You don't have permission to edit this post.</p>
        <button 
          onClick={() => navigate({ to: '/' })}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    )
  }

  const handleSubmit = async (postData: any) => {
    await updatePost(postData)
    navigate({ to: '/posts/$postId', params: { postId } })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  )
}