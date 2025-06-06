import React from 'react';
import { Trophy, Star, Film, Clock } from 'lucide-react';
import type { Achievement } from '../../types/profile';

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Mecha Master',
    description: 'Watched 50 mecha anime series',
    icon: 'robot',
    unlockedAt: '2024-02-15',
    rarity: 'epic'
  },
  {
    id: '2',
    title: 'Century Club',
    description: 'Completed 100 anime series',
    icon: 'trophy',
    unlockedAt: '2024-01-20',
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Marathon Runner',
    description: '24 hours of continuous watching',
    icon: 'clock',
    unlockedAt: '2024-03-01',
    rarity: 'legendary'
  }
];

const Achievements: React.FC = () => {
  return (
    <div className="bg-light/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Achievements
      </h2>
      
      <div className="space-y-4">
        {mockAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-light/5 hover:bg-light/10 transition-colors"
          >
            {achievement.icon === 'robot' && <Film className="w-6 h-6 text-primary" />}
            {achievement.icon === 'trophy' && <Star className="w-6 h-6 text-primary" />}
            {achievement.icon === 'clock' && <Clock className="w-6 h-6 text-primary" />}
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-light">{achievement.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                  achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                </span>
              </div>
              <p className="text-sm text-light/70 mt-1">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;