"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, X } from "lucide-react";
import { useEffect } from "react";
import type { Notification } from "@/lib/types";

export interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

export default function Toast({ notification, onClose }: ToastProps) {
  const { id, type, title, message } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "error":
        return <ShieldAlert className="h-5 w-5 text-rose-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getContainerStyles = () => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500 bg-green-500/10";
      case "warning":
        return "border-l-4 border-amber-500 bg-amber-500/10";
      case "error":
        return "border-l-4 border-rose-500 bg-rose-500/10";
      default:
        return "border-l-4 border-blue-500 bg-blue-500/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 20 }}
      className={`p-4 rounded-r-lg shadow-lg backdrop-blur-sm ${getContainerStyles()} mb-3 max-w-xs`}
    >
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-xs text-slate-300">{message}</p>
        </div>
        <div className="ml-2">
          <button
            onClick={() => onClose(id)}
            className="inline-flex text-slate-400 hover:text-white focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
