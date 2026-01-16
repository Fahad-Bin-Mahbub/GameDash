"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { Player } from "@/lib/types";

export interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onClick: () => void;
}

export default function PlayerCard({ player, isSelected, onClick }: PlayerCardProps) {
  const getRankStyles = (rank: any) => {
    if (rank === 1) {
      return {
        borderColor: "border-amber-400",
        badgeBg: "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400",
        glow: "shadow-lg shadow-amber-500/30",
        textColor: "text-amber-300"
      };
    } else if (rank === 2) {
      return {
        borderColor: "border-slate-300",
        badgeBg: "bg-gradient-to-r from-zinc-400 via-slate-300 to-gray-200",
        glow: "shadow-lg shadow-slate-400/30",
        textColor: "text-slate-200"
      };
    } else if (rank === 3) {
      return {
        borderColor: "border-amber-700",
        badgeBg: "bg-gradient-to-r from-amber-800 via-amber-700 to-orange-600",
        glow: "shadow-lg shadow-amber-700/30",
        textColor: "text-amber-600"
      };
    } else {
      return {
        borderColor: "border-slate-700 group-hover:border-cyan-700/60",
        badgeBg: "bg-slate-700",
        glow: "",
        textColor: "text-slate-400"
      };
    }
  };

  const getWinRateGradient = (winRate: any) => {
    if (winRate > 70) {
      return "bg-gradient-to-r from-teal-500 via-emerald-600 to-emerald-500";
    } else if (winRate > 50) {
      return "bg-gradient-to-r from-orange-600 via-amber-400 to-orange-400";
    } else {
      return "bg-gradient-to-r from-rose-600 via-pink-500 to-rose-500";
    }
  };

  const rankStyles = getRankStyles(player.rank);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`p-3 md:p-5 cursor-pointer relative group overflow-hidden transition-all duration-300 ${
        isSelected
          ? "bg-gradient-to-r from-slate-900/95 to-slate-900/80"
          : "bg-slate-900 hover:bg-gradient-to-r hover:from-slate-900/90 hover:to-slate-800/80"
      }`}
    >
      <div className="absolute inset-0 opacity-20 bg-noise pointer-events-none"></div>

      {isSelected && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-600"
        ></motion.div>
      )}

      {!isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 transition-all duration-300"></div>
      )}

      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/5 to-transparent pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div
            className={`flex-shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-bold transition-all duration-200 ${
              player.rank <= 3
                ? `bg-gradient-to-br from-slate-900 to-slate-800 text-white border ${rankStyles.borderColor} ${rankStyles.glow}`
                : "bg-slate-900 text-slate-400 border border-slate-700/70 group-hover:border-slate-600/70"
            }`}
          >
            <span className={`text-xs md:text-base ${player.rank <= 3 ? rankStyles.textColor : ""}`}>
              {player.rank}
            </span>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <div
                className={`absolute -inset-0.5 rounded-lg opacity-50 blur-sm ${
                  player.rank <= 3
                    ? rankStyles.badgeBg
                    : "bg-slate-700/0 group-hover:bg-cyan-800/30"
                } transition-all duration-300`}
              ></div>
              <img
                src={player.avatar}
                alt={player.name}
                className={`h-8 w-8 md:h-12 md:w-12 rounded-full border-2 transition-all duration-300 relative z-10 ${rankStyles.borderColor}`}
              />

              {player.rank <= 3 && (
                <div
                  className={`absolute -top-2 -right-2 p-1 md:p-1.5 rounded-md ${rankStyles.badgeBg} ${rankStyles.glow} z-20`}
                >
                  <Trophy className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 text-white drop-shadow" />
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold text-white tracking-tight text-xs md:text-base">
                {player.name}
              </div>
              <div className="text-xs text-slate-300 flex items-center space-x-2 mt-0.5 md:mt-1">
                <span className="bg-slate-900 px-1.5 py-0.5 rounded-md text-cyan-300 text-[10px] md:text-xs font-medium border border-slate-700/50 transition-colors duration-200 group-hover:border-cyan-900/30 group-hover:bg-slate-800/90">
                  Lvl {player.level}
                </span>
                <span className="text-slate-500 hidden md:inline">•</span>
                <span className="text-slate-300 text-[10px] md:text-xs hidden md:inline">
                  {player.wins} Wins
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-white text-sm md:text-lg">
            {player.score.toLocaleString(undefined, {
              maximumFractionDigits: 0
            })}
          </div>
          <div className="text-[10px] md:text-xs flex items-center justify-end mt-0.5 md:mt-1">
            <span
              className={`px-1.5 md:px-2 py-0.5 rounded-md font-medium ${
                player.winRate > 70
                  ? "bg-teal-900/40 text-teal-300"
                  : player.winRate > 50
                  ? "bg-amber-900/40 text-amber-300"
                  : "bg-fuchsia-900/40 text-pink-300"
              }`}
            >
              {player.winRate}% WR
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-4 h-1.5 md:h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/70">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${player.winRate}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full relative overflow-hidden ${getWinRateGradient(player.winRate)}`}
        >
          <div className="absolute inset-0 w-full h-full shimmer-effect"></div>
          <div className="absolute inset-0 w-full h-1/2 bg-white/20"></div>
        </motion.div>
      </div>

      <div className="mt-1.5 md:mt-2 flex justify-between text-[10px] md:text-xs text-slate-500">
        <div className="flex items-center space-x-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              player.winRate > 50 ? "bg-cyan-500" : "bg-slate-600"
            }`}
          ></div>
          <span>K/D: {player.stats.kdRatio}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              player.stats.accuracy > 60 ? "bg-cyan-500" : "bg-slate-600"
            }`}
          ></div>
          <span>Accuracy: {player.stats.accuracy.toFixed(1)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
