// src/hooks/usePosts.ts
import { useState, useCallback, useEffect } from 'react'
import type { Post } from '../types'
import { api } from '../utils/api'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getPosts()
      setPosts(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const createPost = useCallback(async (post: Omit<Post, 'id'>) => {
    const newPost = await api.createPost(post)
    setPosts(prev => [...prev, newPost])
    return newPost
  }, [])

  const updatePost = useCallback(async (id: number, post: Partial<Post>) => {
    const updatedPost = await api.updatePost(id, post)
    setPosts(prev => prev.map(p => p.id === id ? updatedPost : p))
    return updatedPost
  }, [])

  const deletePost = useCallback(async (id: number) => {
    await api.deletePost(id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }, [])

  return {
    posts,
    loading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost
  }
}

// Traditional hook for single post
export function usePost(postId: number) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    
    async function fetchPost() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getPost(postId)
        if (!cancelled) {
          setPost(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load post')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPost()

    return () => {
      cancelled = true
    }
  }, [postId])

  const updatePost = useCallback(async (data: Partial<Post>) => {
    const updated = await api.updatePost(postId, data)
    setPost(updated)
    return updated
  }, [postId])

  const deletePost = useCallback(async () => {
    await api.deletePost(postId)
  }, [postId])

  return {
    post,
    loading,
    error,
    updatePost,
    deletePost
  }
}