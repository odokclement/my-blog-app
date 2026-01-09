import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewPostPage from './pages/NewPostPage'
import PostPage from './pages/PostPage'
import EditPostPage from './pages/EditPostPage'

// Root route
const rootRoute = createRootRoute({
  component: App,
})

// Define your routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const newPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/new',
  component: NewPostPage,
})

const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  component: PostPage,
})

const editPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId/edit',
  component: EditPostPage,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute, 
  loginRoute, 
  newPostRoute, 
  postRoute,
  editPostRoute
])

// Create and export the router
export const router = createRouter({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}