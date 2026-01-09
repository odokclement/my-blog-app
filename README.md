#  My Blog App

A modern, full-featured blog application built with React 19, TypeScript, and TanStack Router. This project demonstrates CRUD operations, authentication, and permission-based access control.

##  Project Structure
```
my-blog-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── PostCard.tsx   # Blog post card component
│   │   ├── PostForm.tsx   # Create/Edit post form
│   │   └── Header.tsx     # Navigation header
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.tsx # Authentication context
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts     # Authentication hook
│   │   └── usePosts.ts    # Posts data management hook
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx   # Blog posts listing
│   │   ├── PostPage.tsx   # Single post view
│   │   ├── LoginPage.tsx  # Login page
│   │   ├── NewPostPage.tsx # Create new post
│   │   └── EditPostPage.tsx # Edit existing post
│   ├── utils/             # Utility functions
│   │   └── api.ts         # API service layer
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Shared types/interfaces
│   ├── router.tsx         # TanStack Router configuration
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

##  Technology Stack

- **React 19** - Latest React version with new features
- **TypeScript** - Type-safe development
- **TanStack Router** - Modern routing solution
- **Vite** - Fast build tool and dev server
- **Context API** - State management for authentication
- **Zustand** - Optional state management (implemented but not required)
- **Axios** - HTTP client for API calls
- **date-fns** - Date formatting utility
- **JSONPlaceholder** - Mock REST API for development

##  Features

###  Authentication System
- Login/Logout functionality
- Persistent sessions using localStorage
- Role-based permissions (Admin vs Regular User)

###  Blog CRUD Operations
- **Create** new blog posts
- **Read** blog posts list and individual posts
- **Update** existing posts (with permissions)
- **Delete** posts (with permissions)

###  Permission System
- **Admin users** can edit/delete ANY post
- **Regular users** can only edit/delete THEIR OWN posts
- **Guest users** can only view posts

###  Modern UI/UX
- Responsive design
- Clean, modern interface
- Loading states and error handling
- Form validation

###  React 19 Features
- Using new React 19 features where applicable
- Optimized performance
- TypeScript throughout

##  Default Users

Two demo accounts are pre-configured for testing:

| Username | Password      | Role            | Permissions                          |
|----------|---------------|-----------------|--------------------------------------|
| `admin`  | any password  | Administrator   | Can edit/delete ALL posts            |
| `user`   | any password  | Regular User    | Can only edit/delete own posts       |

> **Note:** The authentication is mock-based for this demo. Any password will work with these usernames.

##  Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Installation

1. **Clone or create the project:**
```bash
   git clone <repository-url>
   cd my-blog-app
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Start the development server:**
```bash
   npm run dev
```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

##  Application Routes

- `/` - Home page with all blog posts
- `/login` - Login page
- `/posts/new` - Create new post (protected)
- `/posts/:postId` - View single post
- `/posts/:postId/edit` - Edit post (protected)

##  API Integration

The application uses **JSONPlaceholder** as a mock API:

### API Endpoints Used:
- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### API Service Layer
All API calls are managed through `src/utils/api.ts` with proper error handling and TypeScript types.

##  Styling

The application uses custom CSS with a utility-class approach similar to Tailwind:

- Responsive design with mobile-first approach
- Custom component styles in `index.css`
- CSS variables for consistent theming
- No external CSS frameworks for maximum control

##  Key Implementation Details

### Authentication Context (`AuthContext.tsx`)
- Uses React Context API for global state
- Implements localStorage persistence
- Provides `useAuth` hook for easy access
- Handles login, logout, and user state

### Custom Hooks
- `usePosts()` - Manages posts data with React 19 `use()` hook
- `useAuth()` - Provides authentication state and methods

### Routing (`router.tsx`)
- File-based routing with TanStack Router
- Type-safe route parameters
- Lazy loading capabilities
- Nested route support

### Component Architecture
- **Presentational Components:** PostCard, PostForm
- **Container Components:** Page components
- **Layout Components:** Header, App
- Reusable and composable design

##  Testing the Features

### 1. Login as Admin
- Username: `admin`, Password: `anything`
- Create new posts
- Edit/Delete ANY post (even those created by others)

### 2. Login as Regular User
- Username: `user`, Password: `anything`
- Create new posts
- Can only edit/delete posts you created

### 3. Guest User
- View all posts
- Cannot create, edit, or delete posts
- Redirected to login when trying to access protected routes

##  Common Issues & Solutions

### CSS Not Loading
- Ensure `src/index.css` exists and is imported in `main.tsx`
- Check Vite configuration for CSS processing
- Clear browser cache with `Ctrl+Shift+R`

### Router Issues
- Run `npm run build` if routes aren't recognized
- Check TanStack Router version compatibility

### API Errors
- JSONPlaceholder is a mock API - changes aren't persisted
- Network errors will show fallback UI
- Check browser DevTools Network tab

##  Git Commit Strategy

The project follows semantic commit messages:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code formatting
refactor: code restructuring
test: add/update tests
chore: build process/dependencies
```

##  Future Enhancements

Potential improvements:

- [ ] Real backend integration
- [ ] User registration
- [ ] Post categories/tags
- [ ] Search functionality
- [ ] Pagination
- [ ] Comments system
- [ ] Image uploads
- [ ] Dark mode
- [ ] Unit/Integration tests
- [ ] PWA capabilities

##  License

This project is created for educational purposes and competency testing.

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

##  Acknowledgments

- [React 19](https://react.dev/)
- [TanStack Router](https://tanstack.com/router)
- [Vite](https://vitejs.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
