import React from 'react';
import { MessageSquare, Star, ThumbsUp } from 'lucide-react';
import type { AnimeReview } from '../../types/profile';

const mockReviews: AnimeReview[] = [
  {
    id: '1',
    animeId: '1',
    title: 'Attack on Titan',
    content: 'A masterpiece that redefines the shounen genre. The character development and plot twists keep you on the edge of your seat.',
    rating: 9.5,
    pros: ['Amazing animation', 'Complex plot', 'Great character development'],
    cons: ['Long wait between seasons'],
    spoilers: false,
    createdAt: '2024-03-01',
    likes: 245
  }
];

const ReviewShowcase: React.FC = () => {
  return (
    <div className="bg-light/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        Featured Reviews
      </h2>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-light">{review.title}</h3>
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-4 h-4 fill-current" />
                <span>{review.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-light/90">{review.content}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-light/70 mb-2">Pros</h4>
                <ul className="space-y-1">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-light/90">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-light/70 mb-2">Cons</h4>
                <ul className="space-y-1">
                  {review.cons.map((con, index) => (
                    <li key={index} className="text-sm text-light/90">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-light/70">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{review.likes} likes</span>
              </div>
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewShowcase;