"use client";

import { motion } from "framer-motion";
import { Activity, PieChart, Target, Zap } from "lucide-react";

import type { Player } from "@/lib/types";
import StatsCard from "@/components/ui/StatsCard";
import {
  AccuracyTrendChart,
  RecentMatchesPerformanceChart,
} from "@/components/stats/StatsCharts";

export default function CombatStats({
  selectedPlayer,
}: {
  selectedPlayer: Player;
}) {
  return (
    <motion.div
      key="combat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
        <StatsCard
          title="Kills"
          value={selectedPlayer.stats.kills.toLocaleString()}
          accent="cyan"
          iconClassName="bg-green-500/20 text-green-400"
          icon={<Target className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+8.2%"
          changeTextClassName="text-green-400"
          changeChevronClassName="fill-green-400"
        />

        <StatsCard
          title="Deaths"
          value={selectedPlayer.stats.deaths.toLocaleString()}
          accent="rose"
          iconClassName="bg-rose-500/20 text-rose-400"
          icon={<Activity className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+3.7%"
          changeTextClassName="text-rose-400"
          changeChevronClassName="fill-rose-400"
        />

        <StatsCard
          title="Headshots"
          value={selectedPlayer.stats.headshots.toLocaleString()}
          accent="fuchsia"
          iconClassName="bg-fuchsia-500/20 text-fuchsia-400"
          icon={<Zap className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+2.3%"
          changeTextClassName="text-green-400"
          changeChevronClassName="fill-green-400"
        />

        <StatsCard
          title="Accuracy"
          value={`${selectedPlayer.stats.accuracy.toFixed(1)}%`}
          accent="amber"
          iconClassName="bg-amber-500/20 text-amber-400"
          icon={<PieChart className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+0.3"
          changeTextClassName="text-green-400"
          changeChevronClassName="fill-green-400"
        />
      </div>

      <RecentMatchesPerformanceChart recentGames={selectedPlayer.recentGames} />
      <AccuracyTrendChart accuracyData={selectedPlayer.accuracyData} />
    </motion.div>
  );
}
