import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Reply } from 'lucide-react';

const Comments: React.FC = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="bg-light/5 backdrop-blur-sm border border-light/10 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-light mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments
      </h3>

      {/* Comment Form */}
      <div className="mb-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 bg-light/5 border border-light/10 rounded-lg text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 transition-colors">
            Post Comment
          </button>
        </div>
      </div>

      {/* Sample Comment */}
      <div className="space-y-6">
        <div className="border-b border-light/10 pb-6">
          <div className="flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-light">John Doe</span>
                <span className="text-sm text-light/50">2 hours ago</span>
              </div>
              <p className="text-light/90 mb-2">
                This episode was amazing! The animation quality keeps getting better.
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-light/50 hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>24</span>
                </button>
                <button className="flex items-center gap-1 text-light/50 hover:text-primary transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span>2</span>
                </button>
                <button className="flex items-center gap-1 text-light/50 hover:text-primary transition-colors">
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;