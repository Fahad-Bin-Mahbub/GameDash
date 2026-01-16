"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";

import type { Player } from "@/lib/types";
import ChartCard from "@/components/ui/ChartCard";
import AchievementCard from "@/components/ui/AchievementCard";

export default function AchievementStats({
  selectedPlayer,
}: {
  selectedPlayer: Player;
}) {
  return (
    <motion.div
      key="achievements"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ChartCard title="Achievement Progress" icon={<Trophy />} iconColor="text-amber-500">
        <div className="mb-4 md:mb-6 flex justify-between items-center">
          <div></div>
          <div className="flex items-center space-x-2 bg-slate-700/50 py-1 md:py-1.5 px-2 md:px-3 rounded-md border border-slate-600/30">
            <Award className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-500" />
            <span className="text-xs md:text-sm font-medium text-slate-200">
              {selectedPlayer.achievements.completed}/{selectedPlayer.achievements.total} Completed
            </span>
          </div>
        </div>

        <div className="mb-6 md:mb-10">
          <div className="flex justify-between text-xs md:text-sm mb-2">
            <span className="text-slate-400 font-medium">Overall Completion</span>
            <span className="text-slate-200 font-semibold">{selectedPlayer.achievements.progress}%</span>
          </div>
          <div className="h-2 md:h-3 w-full bg-slate-700 rounded-md overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${selectedPlayer.achievements.progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-md bg-gradient-to-r from-orange-500 to-orange-400 relative overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full shimmer-effect"></div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {selectedPlayer.achievementCategories.map((category, index) => (
            <div key={category.name} className="relative">
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="h-7 w-7 md:h-9 md:w-9 rounded-md bg-slate-700/70 flex items-center justify-center border border-slate-600/30">
                    <Award className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
                  </div>
                  <span className="font-medium text-white text-sm md:text-base">{category.name}</span>
                </div>
                <div className="text-xs md:text-sm bg-slate-700/70 px-2 py-1 rounded-md border border-slate-600/30">
                  <span className="text-amber-500">{category.completed}</span>
                  <span className="text-slate-400">/{category.total}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="w-full h-1.5 md:h-2 bg-slate-700 rounded-md overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                    className="h-full rounded-md bg-gradient-to-r from-orange-500 to-orange-400 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full shimmer-effect"></div>
                  </motion.div>
                </div>
                <div className="text-xs md:text-sm font-bold w-12 md:w-14 text-right text-slate-200">
                  {category.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      <div className="mt-4 md:mt-8">
        <ChartCard title="Recent Achievements" icon={<Award />} iconColor="text-amber-500">
          <div className="space-y-3 md:space-y-4 mt-3 md:mt-4">
            {selectedPlayer.recentAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}
