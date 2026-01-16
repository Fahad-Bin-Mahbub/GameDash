"use client";

import { useCallback, useRef, useState } from "react";
import type { Notification } from "@/lib/types";
import { MAX_TOASTS } from "@/lib/constants";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [displayedNotifications, setDisplayedNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Kept for parity with the original file (even though it isn't consumed elsewhere).
  const notificationsRef = useRef<Notification[]>([]);
  const allNotificationsRef = useRef<Notification[]>([]);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
    notificationsRef.current = [notification, ...notificationsRef.current];
    allNotificationsRef.current = [notification, ...allNotificationsRef.current];
    setNotificationCount((prev) => prev + 1);

    setDisplayedNotifications((prev) => [notification, ...prev].slice(0, MAX_TOASTS));
  }, []);

  const closeToast = useCallback((id: string) => {
    setDisplayedNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const closeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, dismissed: true } : n)));
    setDisplayedNotifications((prev) => prev.filter((n) => n.id !== id));
    notificationsRef.current = notificationsRef.current.map((n) =>
      n.id === id ? { ...n, dismissed: true } : n
    );
    setNotificationCount((prev) => Math.max(0, prev - 1));
  }, []);

  const resetNotificationCount = useCallback(() => {
    setNotificationCount(0);
  }, []);

  const clearAll = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, dismissed: true })));
    setDisplayedNotifications([]);
    notificationsRef.current = notificationsRef.current.map((n) => ({ ...n, dismissed: true }));
    setNotificationCount(0);
  }, []);

  return {
    notifications,
    displayedNotifications,
    notificationCount,
    addNotification,
    closeToast,
    closeNotification,
    resetNotificationCount,
    clearAll
  };
}
