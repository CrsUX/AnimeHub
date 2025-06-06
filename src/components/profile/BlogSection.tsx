import React from 'react';
import { PenTool, MessageCircle, ThumbsUp } from 'lucide-react';
import type { BlogPost } from '../../types/profile';

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why Slice of Life Anime Matters',
    excerpt: 'Exploring the subtle beauty and impact of everyday moments in anime...',
    content: '',
    tags: ['Analysis', 'Slice of Life'],
    createdAt: '2024-03-10',
    likes: 156,
    comments: 23
  }
];

const BlogSection: React.FC = () => {
  return (
    <div className="bg-light/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-2">
        <PenTool className="w-5 h-5 text-primary" />
        Blog Posts
      </h2>

      <div className="space-y-6">
        {mockPosts.map((post) => (
          <div key={post.id} className="space-y-4">
            <h3 className="text-lg font-medium text-light">{post.title}</h3>
            <p className="text-light/90">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-light/70">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;