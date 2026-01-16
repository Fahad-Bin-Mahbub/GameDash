"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";

import type { Player, StatCategory } from "@/lib/types";
import OverviewStats from "@/components/stats/OverviewStats";
import CombatStats from "@/components/stats/CombatStats";
import AchievementStats from "@/components/stats/AchievementStats";

export default function PlayerStatsPanel({
  selectedPlayer,
  statCategory,
  setStatCategory,
}: {
  selectedPlayer: Player | null;
  statCategory: StatCategory;
  setStatCategory: (c: StatCategory) => void;
}) {
  return (
    <div className="lg:col-span-2 space-y-4 md:space-y-8">
      {selectedPlayer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-800/80 hover:border-slate-700/50 transition-all duration-300 group"
        >
          <div className="p-4 md:p-6 border-b border-slate-800/80 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/0 to-slate-800/0 group-hover:from-slate-800/50 group-hover:to-slate-800/20 transition-all duration-300"></div>

            <div className="flex flex-col sm:flex-row justify-between z-10 relative">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedPlayer.avatar}
                    alt={selectedPlayer.name}
                    className="h-10 w-10 md:h-14 md:w-14 rounded-full border border-slate-700/70 group-hover:border-cyan-600/30 transition-all duration-300"
                  />
                  {selectedPlayer.rank <= 3 && (
                    <div
                      className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 p-0.5 md:p-1 rounded-sm ${
                        selectedPlayer.rank === 1
                          ? "bg-amber-500"
                          : selectedPlayer.rank === 2
                          ? "bg-slate-400"
                          : "bg-amber-700"
                      }`}
                    >
                      <Trophy className="h-2.5 w-2.5 md:h-3 md:w-3 text-slate-900" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {selectedPlayer.name}
                  </h2>
                  <div className="flex items-center flex-wrap gap-2 text-slate-400 mt-1">
                    <span className="bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded text-xs md:text-sm border border-slate-700/30 group-hover:border-slate-700/50 transition-all duration-200">
                      Rank #{selectedPlayer.rank}
                    </span>
                    <span className="bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded text-xs md:text-sm border border-slate-700/30 group-hover:border-slate-700/50 transition-all duration-200">
                      Level {selectedPlayer.level}
                    </span>
                    <span className="bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded text-xs md:text-sm border border-slate-700/30 group-hover:border-slate-700/50 transition-all duration-200">
                      {selectedPlayer.score.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}{" "}
                      pts
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex gap-2 flex-wrap">
                <button
                  onClick={() => setStatCategory("overview")}
                  className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-150 ${
                    statCategory === "overview"
                      ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-slate-800/70 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600/70"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setStatCategory("combat")}
                  className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-150 ${
                    statCategory === "combat"
                      ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-slate-800/70 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600/70"
                  }`}
                >
                  Combat
                </button>
                <button
                  onClick={() => setStatCategory("achievements")}
                  className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-150 ${
                    statCategory === "achievements"
                      ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-slate-800/70 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600/70"
                  }`}
                >
                  Achievements
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-6">
            <AnimatePresence mode="wait">
              {statCategory === "overview" && (
                <OverviewStats selectedPlayer={selectedPlayer} />
              )}
              {statCategory === "combat" && (
                <CombatStats selectedPlayer={selectedPlayer} />
              )}
              {statCategory === "achievements" && (
                <AchievementStats selectedPlayer={selectedPlayer} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
