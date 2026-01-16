"use client";

import { motion } from "framer-motion";
import { BarChart2, Home, LogOut, Settings, Trophy, User, Users } from "lucide-react";

export default function MobileMenu({
  isOpen,
  isOnline,
  serverLoad,
  activePlayers,
  onClose
}: {
  isOpen: boolean;
  isOnline: boolean;
  serverLoad: number;
  activePlayers: number;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden py-3 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm"
    >
      <div className="flex flex-col space-y-1">
        <div className="px-4 py-2 mb-2">
          <div className="flex items-center justify-between text-xs">
            <div
              className={`flex items-center px-2 py-1 rounded-full ${
                isOnline ? "bg-green-500/10 text-green-400" : "bg-rose-500/10 text-rose-400"
              } border border-slate-700`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isOnline ? "bg-green-500 animate-pulse" : "bg-rose-500"
                }`}
              ></div>
              {isOnline ? "Online" : "Offline"}
            </div>
            <div className="flex items-center text-slate-300">
              <Users className="h-3 w-3 mr-1 text-cyan-400" />
              {activePlayers.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-slate-400 mr-2">Server Load:</span>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden mr-2">
              <div
                className={`h-full ${
                  serverLoad > 90
                    ? "bg-rose-500"
                    : serverLoad > 75
                    ? "bg-amber-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${serverLoad}%` }}
              ></div>
            </div>
            <span className="text-slate-300">{serverLoad.toFixed(1)}%</span>
          </div>
        </div>

        <a
          href="#"
          className="px-4 py-3 text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
          onClick={onClose}
        >
          <Home className="h-4 w-4 mr-3" />
          Dashboard
        </a>
        <a
          href="#"
          className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
          onClick={onClose}
        >
          <Trophy className="h-4 w-4 mr-3" />
          Tournaments
        </a>
        <a
          href="#"
          className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
          onClick={onClose}
        >
          <Users className="h-4 w-4 mr-3" />
          Teams
        </a>
        <a
          href="#"
          className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
          onClick={onClose}
        >
          <BarChart2 className="h-4 w-4 mr-3" />
          Analytics
        </a>
        <a
          href="#"
          className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
          onClick={onClose}
        >
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </a>
        <a
          href="#"
          className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
          onClick={onClose}
        >
          <User className="h-4 w-4 mr-3" />
          Profile
        </a>
        <div className="border-t border-slate-800 mt-2 pt-2">
          <a
            href="#"
            className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md flex items-center transition-colors"
            onClick={onClose}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </a>
        </div>
      </div>
    </motion.div>
  );
}
