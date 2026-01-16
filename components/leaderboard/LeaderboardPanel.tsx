"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import type { Player } from "@/lib/types";
import PlayerCard from "@/components/leaderboard/PlayerCard";

export default function LeaderboardPanel({
  players,
  selectedPlayer,
  onSelectPlayer,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery
}: {
  players: Player[];
  selectedPlayer: Player | null;
  onSelectPlayer: (p: Player) => void;
  sortBy: "rank" | "score" | "winRate";
  setSortBy: (v: "rank" | "score" | "winRate") => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  const filteredPlayers = players
    .filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank;
      if (sortBy === "score") return b.score - a.score;
      return b.winRate - a.winRate;
    });

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black rounded-xl shadow-xl overflow-hidden border border-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 flex flex-col h-full relative group"
    >
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/20 rounded-br-xl pointer-events-none"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 to-slate-700/0 group-hover:from-cyan-600/10 group-hover:to-cyan-600/5 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-cyan-500/0 group-hover:bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

      <div className="p-4 md:p-6 bg-slate-800/70 backdrop-blur-sm border-b border-slate-700/50 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
              <Users className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">Players Leaderboard</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rank" | "score" | "winRate")}
                className="appearance-none bg-slate-800 text-slate-200 text-xs md:text-sm rounded-lg py-1.5 pl-2 pr-7 md:py-2 md:pl-3 md:pr-8 border border-slate-700/70 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-600/30 transition-all duration-200 hover:border-slate-600"
              >
                <option value="rank">Rank</option>
                <option value="score">Score</option>
                <option value="winRate">Win Rate</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-5 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-200" />
          </div>
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/90 text-slate-200 placeholder-slate-500 border border-slate-700/70 rounded-lg py-2 pl-9 pr-4 md:py-3 md:pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-500/50 transition-all duration-200 hover:border-slate-600 text-sm"
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none ring-0 group-focus-within:ring-2 ring-cyan-500/20 group-focus-within:ring-opacity-60 transition-all duration-300"></div>
        </div>

        <div className="mt-3 md:mt-4 flex justify-between text-[10px] md:text-xs text-slate-400">
          <span>Showing {filteredPlayers.length} players</span>
          <span className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-500 mr-1.5 animate-pulse"></div>
            Live Rankings
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative max-h-[calc(100vh-16rem)] md:max-h-full">
        <div className="absolute inset-0 overflow-y-auto modern-scrollbar pb-2">
          <AnimatePresence>
            {filteredPlayers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-56 p-4 text-slate-400"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 md:h-8 md:w-8 text-slate-500" />
                </div>
                <p className="text-center text-sm md:text-base">No players found matching your search</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 px-3 py-1.5 text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-md transition-colors border border-slate-700/50"
                >
                  Clear Search
                </button>
              </motion.div>
            ) : (
              filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <PlayerCard
                    player={player}
                    isSelected={selectedPlayer?.id === player.id}
                    onClick={() => onSelectPlayer(player)}
                  />

                  {index < filteredPlayers.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-slate-800/0 via-slate-700/30 to-slate-800/0 mx-4"></div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-slate-800/90 to-transparent pointer-events-none z-10 opacity-70"></div>
        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-slate-800/90 to-transparent pointer-events-none z-10 opacity-70"></div>
      </div>
    </motion.div>
  );
}
