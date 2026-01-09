// src/components/PostForm.tsx
import { useState } from 'react'
import type { Post } from '../types'

interface PostFormProps {
  initialData?: Partial<Post>
  onSubmit: (post: Omit<Post, 'id'>) => Promise<void>
  isLoading?: boolean
}

export function PostForm({ initialData, onSubmit, isLoading }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [body, setBody] = useState(initialData?.body || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    
    await onSubmit({
      title: title.trim(),
      body: body.trim(),
      userId: initialData?.userId || 1 // Default user ID
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter post title"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-48"
          required
          placeholder="Write your post content here..."
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : initialData?.id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  )
}