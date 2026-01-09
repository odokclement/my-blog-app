//postcard component
import type { Post } from "../types";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuth();
  const canEdit = user && (user.id === post.userId || user.isAdmin);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By User {post.userId}</span>
        <div className="space-x-2">
          <Link
            to="/posts/$postId"
            params={{ postId: post.id.toString() }}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
            Read
          </Link>
          {canEdit && (
            <>
              <Link
                to="/posts/$postId/edit"
                params={{ postId: post.id.toString() }}
                className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(post.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
