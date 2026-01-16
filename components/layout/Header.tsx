"use client";

import {
  Bell,
  Menu,
  Trophy,
  User,
  Users,
  X
} from "lucide-react";
import type { Notification } from "@/lib/types";
import NotificationCenter from "@/components/layout/NotificationCenter";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header({
  isOnline,
  serverLoad,
  activePlayers,
  notificationCount,
  notifications,
  isNotificationsOpen,
  onToggleNotifications,
  onResetNotificationCount,
  onClearAllNotifications,
  onCloseNotification,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onClearAllNotificationsAndCloseDropdown
}: {
  isOnline: boolean;
  serverLoad: number;
  activePlayers: number;
  notificationCount: number;
  notifications: Notification[];
  isNotificationsOpen: boolean;
  onToggleNotifications: () => void;
  onResetNotificationCount: () => void;
  onClearAllNotifications: () => void;
  onClearAllNotificationsAndCloseDropdown: () => void;
  onCloseNotification: (id: string) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}) {
  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
              <Trophy className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
            </div>
            <div className="font-bold text-lg md:text-2xl text-white tracking-tight">GameDash</div>

            <div
              className={`hidden md:flex items-center ml-4 px-3 py-1 rounded-full ${
                isOnline ? "bg-green-500/10 text-green-400" : "bg-rose-500/10 text-rose-400"
              } text-xs border border-slate-700`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isOnline ? "bg-green-500 animate-pulse" : "bg-rose-500"
                }`}
              ></div>
              {isOnline ? "Online" : "Connection Issues"}
            </div>
          </div>

          {/* Desktop status + actions */}
          <div className="hidden md:flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="text-slate-400 mr-2">Load:</div>
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
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
              <div className="ml-2 text-slate-300">{serverLoad.toFixed(1)}%</div>
            </div>

            <div className="flex items-center text-slate-300">
              <Users className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
              {activePlayers.toLocaleString()} players
            </div>

            <div className="flex items-center space-x-1 md:space-x-4">
              <div className="relative">
                <button
                  onClick={() => {
                    onToggleNotifications();
                    if (!isNotificationsOpen) onResetNotificationCount();
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </button>

                <NotificationCenter
                  isOpen={isNotificationsOpen}
                  variant="desktop"
                  notifications={notifications}
                  onClearAll={onClearAllNotifications}
                  onCloseNotification={onCloseNotification}
                />
              </div>

              <button className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => {
                  onToggleNotifications();
                  if (!isNotificationsOpen) onResetNotificationCount();
                }}
                className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              <NotificationCenter
                isOpen={isNotificationsOpen}
                variant="mobile"
                notifications={notifications}
                onClearAll={onClearAllNotificationsAndCloseDropdown}
                onCloseNotification={onCloseNotification}
              />
            </div>

            <button
              onClick={onToggleMenu}
              className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          isOnline={isOnline}
          serverLoad={serverLoad}
          activePlayers={activePlayers}
          onClose={onCloseMenu}
        />
      </div>
    </nav>
  );
}
