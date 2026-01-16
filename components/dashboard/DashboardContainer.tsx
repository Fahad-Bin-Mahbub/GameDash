"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeaderboardPanel from "@/components/leaderboard/LeaderboardPanel";
import PlayerStatsPanel from "@/components/stats/PlayerStatsPanel";
import Toast from "@/components/ui/Toast";
import type { Notification } from "@/lib/types";
import { generateNotification, initialMockPlayers } from "@/lib/mockData";
import { useNotifications } from "@/hooks/useNotifications";
import { usePlayerUpdates } from "@/hooks/usePlayerUpdates";
import { useServerStatus } from "@/hooks/useServerStatus";
import type { StatCategory, TimeRange } from "@/lib/types";

export default function DashboardContainer() {
	// UI state
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	const [sortBy, setSortBy] = useState<"rank" | "score" | "winRate">("rank");
	const [searchQuery, setSearchQuery] = useState("");
	const [timeRange, setTimeRange] = useState<TimeRange>("7d");
	const [statCategory, setStatCategory] = useState<StatCategory>("overview");
	// Realtime simulation hooks
	const { players, selectedPlayer, setSelectedPlayer, prevPlayersRef } =
		usePlayerUpdates(initialMockPlayers);

	const {
		notifications,
		displayedNotifications,
		notificationCount,
		addNotification,
		closeToast,
		closeNotification,
		resetNotificationCount,
		clearAll,
	} = useNotifications();

	const onOnlineChange = useCallback(
		(prev: boolean, next: boolean) => {
			// Match the original behavior: create a toast on transitions.
			if (prev && !next) {
				const offlineNotif: Notification = {
					id: `server-offline-${Date.now()}`,
					type: "error",
					title: "Server Connection Lost",
					message: "Attempting to reconnect...",
					timestamp: Date.now(),
					dismissed: false,
				};
				addNotification(offlineNotif);
			} else if (!prev && next) {
				const onlineNotif: Notification = {
					id: `server-online-${Date.now()}`,
					type: "success",
					title: "Server Connected",
					message: "We're back online!",
					timestamp: Date.now(),
					dismissed: false,
				};
				addNotification(onlineNotif);
			}
		},
		[addNotification]
	);

	const { isOnline, serverLoad, activePlayers } =
		useServerStatus(onOnlineChange);

	// Body scroll lock for mobile menu (CSS already matches original)
	useEffect(() => {
		document.body.classList.toggle("menu-open", isMenuOpen);
		return () => {
			document.body.classList.remove("menu-open");
		};
	}, [isMenuOpen]);

	// Generate player-based notifications (same logic as original)
	useEffect(() => {
		if (prevPlayersRef.current.length === 0) return;

		const newNotifications: Notification[] = [];

		players.forEach((player) => {
			const prevPlayer = prevPlayersRef.current.find((p) => p.id === player.id);
			if (!prevPlayer) return;

			const notification = generateNotification(player, prevPlayer);
			if (notification) {
				newNotifications.push(notification);
			}
		});

		if (newNotifications.length > 0) {
			newNotifications.forEach((notification) => {
				addNotification(notification);
			});
		}
	}, [players, addNotification, prevPlayersRef]);

	const toggleNotifications = useCallback(() => {
		setIsNotificationsOpen((prev) => !prev);
	}, []);

	const clearAllNotificationsAndCloseDropdown = useCallback(() => {
		clearAll();
		setIsNotificationsOpen(false);
	}, [clearAll]);

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 font-inter antialiased">
			<div className="h-1 w-full bg-gradient-to-r from-slate-800 via-cyan-700/30 to-slate-800"></div>

			<div className="fixed inset-0 bg-noise opacity-5 pointer-events-none"></div>

			<Header
				isOnline={isOnline}
				serverLoad={serverLoad}
				activePlayers={activePlayers}
				notificationCount={notificationCount}
				notifications={notifications}
				isNotificationsOpen={isNotificationsOpen}
				onToggleNotifications={toggleNotifications}
				onResetNotificationCount={resetNotificationCount}
				onClearAllNotifications={clearAll}
				onClearAllNotificationsAndCloseDropdown={
					clearAllNotificationsAndCloseDropdown
				}
				onCloseNotification={closeNotification}
				isMenuOpen={isMenuOpen}
				onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
				onCloseMenu={() => setIsMenuOpen(false)}
			/>

			<main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
					<div className="lg:col-span-1 h-full flex flex-col">
						<LeaderboardPanel
							players={players}
							selectedPlayer={selectedPlayer}
							onSelectPlayer={setSelectedPlayer}
							sortBy={sortBy}
							setSortBy={setSortBy}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>
					</div>

					<PlayerStatsPanel
						selectedPlayer={selectedPlayer}
						statCategory={statCategory}
						setStatCategory={setStatCategory}
					/>
				</div>
			</main>

			<Footer />

			{/* Toast notifications */}
			<div className="fixed bottom-4 right-4 z-50 hidden md:block">
				<AnimatePresence>
					{displayedNotifications.map((notification) => (
						<Toast
							key={notification.id}
							notification={notification}
							onClose={closeToast}
						/>
					))}
				</AnimatePresence>
			</div>

			{/* Preserve unused state for parity with the original file */}
			<div className="hidden">
				{timeRange}
				<button onClick={() => setTimeRange("7d")} />
			</div>
		</div>
	);
}
