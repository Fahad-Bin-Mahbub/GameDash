"use client";

import type { Notification } from "@/lib/types";
import { X } from "lucide-react";

export default function NotificationCenter({
  isOpen,
  variant,
  notifications,
  onClearAll,
  onCloseNotification,
  onRequestClose
}: {
  isOpen: boolean;
  variant: "desktop" | "mobile";
  notifications: Notification[];
  onClearAll: () => void;
  onCloseNotification: (id: string) => void;
  onRequestClose?: () => void;
}) {
  if (!isOpen) return null;

  const isMobile = variant === "mobile";
  const visible = notifications.filter((n) => !n.dismissed);
  const list = isMobile ? visible.slice(0, 5) : visible;

  return (
    <div
      className={
        isMobile
          ? "absolute right-[-30px] mt-2 w-72 max-h-80 overflow-y-auto bg-slate-900 rounded-lg shadow-xl border border-slate-700 z-50 notification-dropdown"
          : "absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-slate-900 rounded-lg shadow-xl border border-slate-700 z-50 notification-dropdown"
      }
    >
      <div className="p-3 border-b border-slate-800 text-sm font-medium flex justify-between items-center">
        <span>Notifications</span>
        <button
          className="text-slate-400 hover:text-white"
          onClick={() => {
            onClearAll();
            if (isMobile) onRequestClose?.();
          }}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 p-2">
        {visible.length === 0 ? (
          <div className="p-4 text-center text-slate-400 text-sm">No new notifications</div>
        ) : (
          list.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded border-l-2 text-xs ${
                notification.type === "success"
                  ? "border-green-500 bg-green-500/10"
                  : notification.type === "warning"
                  ? "border-amber-500 bg-amber-500/10"
                  : notification.type === "error"
                  ? "border-rose-500 bg-rose-500/10"
                  : "border-blue-500 bg-blue-500/10"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className={`font-medium text-white ${isMobile ? "text-sm" : ""}`}>
                    {notification.title}
                  </div>
                  <div className={`text-slate-300 mt-1 ${isMobile ? "text-xs" : ""}`}>
                    {notification.message}
                  </div>
                </div>
                <button
                  onClick={() => onCloseNotification(notification.id)}
                  className="ml-2 text-slate-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
