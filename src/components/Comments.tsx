import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Reply, Trash2, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSupabase } from '../hooks/useSupabase';
import { formatDistanceToNow } from '../utils/time';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  likes: number;
  user: {
    username: string;
    avatar_url: string;
  };
}

interface CommentsProps {
  animeId: number;
}

const Comments: React.FC<CommentsProps> = ({ animeId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const supabase = useSupabase();

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('comments')
          .select(`
            id,
            content,
            created_at,
            likes,
            user:user_id (
              username,
              avatar_url
            )
          `)
          .eq('anime_id', animeId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setComments(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [animeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          anime_id: animeId,
          content: comment.trim(),
          user_id: user.id
        })
        .select(`
          id,
          content,
          created_at,
          likes,
          user:user_id (
            username,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      setComments([data, ...comments]);
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="bg-light/5 backdrop-blur-sm border border-light/10 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-light mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments
      </h3>

      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 bg-light/5 border border-light/10 rounded-lg text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button 
              type="submit"
              disabled={!comment.trim()}
              className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-light/5 rounded-lg text-light/70 text-center">
          Please sign in to leave a comment
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center text-light/70">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-light/70">No comments yet</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-light/10 pb-6">
              <div className="flex items-start gap-4">
                <img
                  src={comment.user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-light">{comment.user.username}</span>
                      <span className="text-sm text-light/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(comment.created_at))}
                      </span>
                    </div>
                    {user?.id === comment.user.id && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-light/90 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-light/50 hover:text-primary transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-light/50 hover:text-primary transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1 text-light/50 hover:text-primary transition-colors">
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;