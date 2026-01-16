"use client";

import { motion } from "framer-motion";
import { Activity, BarChart2, Target, Trophy } from "lucide-react";

import type { Player } from "@/lib/types";
import StatsCard from "@/components/ui/StatsCard";
import {
  GameModeStatisticsChart,
  PerformanceOverTimeChart,
} from "@/components/stats/StatsCharts";

export default function OverviewStats({
  selectedPlayer,
}: {
  selectedPlayer: Player;
}) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
        <StatsCard
          title="Wins"
          value={selectedPlayer.wins}
          accent="cyan"
          iconClassName="bg-green-500/20 text-green-400"
          icon={<Trophy className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+4.5%"
          changeTextClassName="text-green-400"
          changeChevronClassName="fill-green-400"
          changeContainerClassName="flex flex-wrap items-center"
        />

        <StatsCard
          title="Losses"
          value={selectedPlayer.losses}
          accent="rose"
          iconClassName="bg-rose-500/20 text-rose-400"
          icon={<Activity className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+1.2%"
          changeTextClassName="text-rose-400"
          changeChevronClassName="fill-rose-400"
        />

        <StatsCard
          title="Win Rate"
          value={`${selectedPlayer.winRate}%`}
          accent="fuchsia"
          iconClassName="bg-fuchsia-500/20 text-fuchsia-400"
          icon={<BarChart2 className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+2.3%"
          changeTextClassName="text-green-400"
          changeChevronClassName="fill-green-400"
        />

        <StatsCard
          title="K/D Ratio"
          value={selectedPlayer.stats.kdRatio}
          accent="amber"
          iconClassName="bg-amber-500/20 text-amber-400"
          icon={<Target className="h-4 w-4 md:h-5 md:w-5" />}
          changeText="+0.3"
          changeTextClassName="text-green-400"
          changeChevronClassName="fill-green-400"
        />
      </div>

      <PerformanceOverTimeChart performanceData={selectedPlayer.performanceData} />
      <GameModeStatisticsChart gameModeData={selectedPlayer.gameModeData} />
    </motion.div>
  );
}
