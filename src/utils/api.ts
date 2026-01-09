// src/utils/api.ts
import axios from 'axios'
import type { Post } from '../types'

const API_BASE = 'https://jsonplaceholder.typicode.com'

export const api = {
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_BASE}/posts`)
    return response.data.slice(0, 10) // Limit to 10 posts for demo
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await axios.get(`${API_BASE}/posts/${id}`)
    return response.data
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await axios.post(`${API_BASE}/posts`, post)
    return response.data
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await axios.put(`${API_BASE}/posts/${id}`, post)
    return response.data
  },

  deletePost: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/posts/${id}`)
  }
}