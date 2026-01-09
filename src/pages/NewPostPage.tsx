// src/pages/NewPostPage.tsx
import { useNavigate } from '@tanstack/react-router'
import { PostForm } from '../components/PostForm'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'

export default function NewPostPage() {
  const navigate = useNavigate()
  const { createPost } = usePosts()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    navigate({ to: '/login' })
    return null
  }

  const handleSubmit = async (postData: any) => {
    await createPost(postData)
    navigate({ to: '/' })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  )
}