"use client";

import { motion } from "framer-motion";
import { Award, Clock, Target, Trophy, Users } from "lucide-react";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  date: string;
  rarity: string;
  icon: string;
  color: string;
}

export interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getIconComponent = () => {
    switch (achievement.icon) {
      case "Trophy":
        return <Trophy className="h-4 w-4 md:h-6 md:w-6" />;
      case "Target":
        return <Target className="h-4 w-4 md:h-6 md:w-6" />;
      case "Users":
        return <Users className="h-4 w-4 md:h-6 md:w-6" />;
      case "Clock":
        return <Clock className="h-4 w-4 md:h-6 md:w-6" />;
      default:
        return <Award className="h-4 w-4 md:h-6 md:w-6" />;
    }
  };

  const getColorClasses = () => {
    switch (achievement.color) {
      case "blue":
        return "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/30";
      case "purple":
        return "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/30";
      case "green":
        return "bg-green-500/10 text-green-400 group-hover:bg-green-500/20 group-hover:border-green-500/30";
      case "gray":
        return "bg-slate-500/10 text-slate-400 group-hover:bg-slate-500/20 group-hover:border-slate-500/30";
      default:
        return "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/30";
    }
  };

  const rarityColorClass = () => {
    switch (achievement.rarity) {
      case "Common":
        return "bg-slate-600/50 text-slate-300";
      case "Uncommon":
        return "bg-green-500/20 text-green-400";
      case "Rare":
        return "bg-blue-500/20 text-blue-400";
      case "Epic":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-amber-500/20 text-amber-400";
    }
  };

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-3 md:p-4 bg-slate-800/80 rounded-lg border border-slate-700/50 hover:border-slate-600/70 transition-all duration-200 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 to-slate-700/0 group-hover:from-slate-700/15 group-hover:to-slate-700/5 transition-all duration-300"></div>

      <div
        className={`h-8 w-8 md:h-12 md:w-12 rounded-md flex items-center justify-center mr-3 md:mr-4 transition-all duration-200 ${getColorClasses()}`}
      >
        {getIconComponent()}
      </div>
      <div className="flex-1 relative z-10">
        <div className="flex items-center flex-wrap">
          <h4 className="font-semibold text-white text-sm md:text-base">{achievement.name}</h4>
          <span
            className={`ml-2 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-md transition-colors duration-200 ${rarityColorClass()}`}
          >
            {achievement.rarity}
          </span>
        </div>
        <p className="text-slate-400 text-xs md:text-sm mt-0.5 md:mt-1">{achievement.description}</p>
        <div className="text-slate-500 text-[10px] md:text-xs mt-1 md:mt-2">{achievement.date}</div>
      </div>
    </motion.div>
  );
}
