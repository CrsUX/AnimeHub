import React from 'react';
import { Trophy, Clock, Star, Activity } from 'lucide-react';

const StatsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={Trophy}
        label="Completed"
        value="247"
        subtext="Series"
      />
      <StatCard
        icon={Clock}
        label="Watched"
        value="5,849"
        subtext="Hours"
      />
      <StatCard
        icon={Star}
        label="Average Rating"
        value="8.4"
        subtext="/ 10"
      />
      <StatCard
        icon={Activity}
        label="Current Streak"
        value="42"
        subtext="Days"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, subtext }) => (
  <div className="bg-light/5 rounded-lg p-4 flex flex-col items-center text-center">
    <Icon className="w-6 h-6 text-primary mb-2" />
    <div className="text-light/70 text-sm">{label}</div>
    <div className="text-2xl font-bold text-light mt-1">{value}</div>
    <div className="text-light/50 text-sm">{subtext}</div>
  </div>
);

export default StatsDashboard;