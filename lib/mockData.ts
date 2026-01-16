import type { Notification, NotificationType, Player } from "./types";

export const generateMockData = (): Player[] => {
	const baseNames = [
		"ShadowSniper",
		"BlazeFury",
		"NightStalker",
		"VortexQueen",
		"PhantomX",
		"ThunderStrike",
		"FrostBite",
		"NeonBlade",
		"CrimsonHawk",
		"OmegaWolf",
		"TitanSlayer",
		"CosmicRift",
		"DriftQueen",
		"NovaGuardian",
		"PaladinEcho",
	];

	return baseNames.slice(0, 10).map((name, index) => {
		const rank = index + 1;
		const score = 10000 - rank * (Math.random() * 300 + 100);
		const wins = Math.floor(200 - rank * (Math.random() * 5 + 2));
		const losses = Math.floor(40 + rank * (Math.random() * 4 + 3));
		const winRate = parseFloat(((wins / (wins + losses)) * 100).toFixed(1));

		const kills = Math.floor(4000 - rank * (Math.random() * 200 + 100));
		const deaths = Math.floor(1200 + rank * (Math.random() * 50 + 25));
		const kdRatio = parseFloat((kills / deaths).toFixed(2));

		const recentGames = Array(5)
			.fill(null)
			.map((_, i) => {
				const day = Math.floor(i / 2);
				const date = new Date();
				date.setDate(date.getDate() - day);

				const hours = Math.floor(Math.random() * 24);
				const minutes = Math.floor(Math.random() * 60);
				date.setHours(hours, minutes);

				const dateStr = `${date.toISOString().split("T")[0]} ${hours
					.toString()
					.padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

				const isWin = Math.random() > 0.3 + rank / 30;
				const result: "win" | "loss" = isWin ? "win" : "loss";

				return {
					id: i + 1,
					date: dateStr,
					result,
					score: isWin
						? Math.floor(300 + Math.random() * 200)
						: Math.floor(150 + Math.random() * 150),
				};

			});

		const performanceData = Array(7)
			.fill(null)
			.map((_, i) => {
				const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
				const monthKills = Math.floor(300 + Math.random() * 200 - rank * 10);
				const monthDeaths = Math.floor(120 + Math.random() * 50 + rank * 2);
				return {
					month: months[i],
					kills: monthKills,
					deaths: monthDeaths,
					kdRatio: parseFloat((monthKills / monthDeaths).toFixed(2)),
				};
			});

		const baseAccuracy = 75 - rank * 3;
		const accuracyData = Array(7)
			.fill(null)
			.map((_, i) => {
				return {
					week: `Week ${i + 1}`,
					accuracy: Math.min(
						90,
						Math.max(40, baseAccuracy + Math.floor(Math.random() * 10 - 5))
					),
				};
			});

		const gameModeData = [
			{
				name: "Deathmatch",
				matches: Math.floor(150 - rank * 5),
				winRate: Math.floor(80 - rank * 2),
			},
			{
				name: "Capture Flag",
				matches: Math.floor(120 - rank * 4),
				winRate: Math.floor(75 - rank * 2),
			},
			{
				name: "Control",
				matches: Math.floor(100 - rank * 3),
				winRate: Math.floor(70 - rank * 2),
			},
			{
				name: "Team Battle",
				matches: Math.floor(130 - rank * 4),
				winRate: Math.floor(85 - rank * 2),
			},
			{
				name: "Boss Hunt",
				matches: Math.floor(80 - rank * 3),
				winRate: Math.floor(60 - rank * 1.5),
			},
		];

		const achievementTotal = 50;
		const achievementCompleted = Math.floor(45 - rank * 3);
		const achievementProgress = Math.floor(
			(achievementCompleted / achievementTotal) * 100
		);

		const achievementCategories = [
			{
				name: "Combat Master",
				completed: Math.floor(15 - rank * 0.5),
				total: 15,
				progress: Math.floor(100 - rank * 3.3),
			},
			{
				name: "Explorer",
				completed: Math.floor(10 - rank * 0.4),
				total: 10,
				progress: Math.floor(100 - rank * 4),
			},
			{
				name: "Strategist",
				completed: Math.floor(8 - rank * 0.3),
				total: 8,
				progress: Math.floor(100 - rank * 5),
			},
			{
				name: "Collector",
				completed: Math.floor(12 - rank * 0.5),
				total: 12,
				progress: Math.floor(100 - rank * 3.5),
			},
			{
				name: "Social",
				completed: Math.floor(10 - rank * 0.4),
				total: 10,
				progress: Math.floor(100 - rank * 4),
			},
		];

		const achievementDates = [
			"1 day ago",
			"3 days ago",
			"1 week ago",
			"2 weeks ago",
		];
		const recentAchievements = [
			{
				id: 1,
				name: "Flawless Victory",
				description: "Win a match without dying",
				date: achievementDates[Math.floor(Math.random() * 4)],
				rarity: "Rare",
				icon: "Trophy",
				color: "blue",
			},
			{
				id: 2,
				name: "Sharpshooter",
				description: "Achieve 90% accuracy in a single match",
				date: achievementDates[Math.floor(Math.random() * 4)],
				rarity: "Epic",
				icon: "Target",
				color: "purple",
			},
			{
				id: 3,
				name: "Team Player",
				description: "Get 15 assists in one match",
				date: achievementDates[Math.floor(Math.random() * 4)],
				rarity: "Uncommon",
				icon: "Users",
				color: "green",
			},
			{
				id: 4,
				name: "Marathon Runner",
				description: "Play for 24 hours total",
				date: achievementDates[Math.floor(Math.random() * 4)],
				rarity: "Common",
				icon: "Clock",
				color: "gray",
			},
		];

		recentAchievements.sort((a, b) => {
			const dateOrder: Record<string, number> = {
				"1 day ago": 0,
				"3 days ago": 1,
				"1 week ago": 2,
				"2 weeks ago": 3,
			};
			return dateOrder[a.date] - dateOrder[b.date];
		});

		const avatarUrls = [
			"https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740",
			"https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuWfsxXJE-q6tDJ2hvRHJcL3HsD--WPYJuNg&s",
			"https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740",
			"https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
			"https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
			"https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740",
			"https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_items_boosted&w=740",
			"https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-woman-round-frame-vector-cartoon-flat-illustration_551425-22.jpg?semt=ais_items_boosted&w=740",
			"https://img.freepik.com/premium-vector/drawing-boy-with-brown-hair-style_1230457-40937.jpg?semt=ais_hybrid&w=740",
		];

		return {
			id: index + 1,
			name,
			rank,
			score,
			wins,
			losses,
			winRate,
			avatar: avatarUrls[index] || avatarUrls[0],
			level: Math.floor(80 - rank * (Math.random() * 2 + 1)),
			achievements: {
				total: achievementTotal,
				completed: achievementCompleted,
				progress: achievementProgress,
			},
			recentGames,
			stats: {
				kills,
				deaths,
				assists: Math.floor(2000 - rank * (Math.random() * 100 + 50)),
				kdRatio,
				accuracy: Math.floor(70 - rank * (Math.random() * 1.5 + 0.5)),
				headshots: Math.floor(1300 - rank * (Math.random() * 80 + 40)),
				playtime: Math.floor(300 - rank * (Math.random() * 10 + 5)),
			},
			performanceData,
			accuracyData,
			gameModeData,
			achievementCategories,
			recentAchievements,
		};
	});
};

export const initialMockPlayers: Player[] = generateMockData();

export const updatePlayerStats = (player: Player): Player => {
	const scoreChange = Math.floor(Math.random() * 20) - 5;
	const winOrLoss = Math.random() > 0.7;

	const updatedPlayer: Player = {
		...player,
		stats: { ...player.stats },
		achievements: { ...player.achievements },
		achievementCategories: player.achievementCategories.map((c) => ({ ...c })),
		performanceData: player.performanceData.map((d) => ({ ...d })),
		accuracyData: player.accuracyData.map((d) => ({ ...d })),
		recentGames: player.recentGames.map((g) => ({ ...g })),
		// keep these as-is unless your types require deeper nesting
		gameModeData: player.gameModeData.map((m) => ({ ...m })),
		recentAchievements: player.recentAchievements.map((a) => ({ ...a })),
	};


	updatedPlayer.score = Math.max(5000, player.score + scoreChange);

	if (winOrLoss) {
		updatedPlayer.wins += 1;
	} else {
		updatedPlayer.losses += 1;
	}

	updatedPlayer.winRate = parseFloat(
		(
			(updatedPlayer.wins / (updatedPlayer.wins + updatedPlayer.losses)) *
			100
		).toFixed(1)
	);

	const killsChange = Math.floor(Math.random() * 10) - 2;
	const deathsChange = Math.floor(Math.random() * 5) - 1;

	updatedPlayer.stats.kills = Math.max(0, player.stats.kills + killsChange);
	updatedPlayer.stats.deaths = Math.max(0, player.stats.deaths + deathsChange);
	updatedPlayer.stats.kdRatio = parseFloat(
		(updatedPlayer.stats.kills / updatedPlayer.stats.deaths).toFixed(2)
	);

	const accuracyChange = Math.random() * 2 - 1;
	updatedPlayer.stats.accuracy = Math.min(
		100,
		Math.max(30, player.stats.accuracy + accuracyChange)
	);

	if (Math.random() > 0.995) {
		const newDate = new Date();
		const hours = Math.floor(Math.random() * 24);
		const minutes = Math.floor(Math.random() * 60);
		newDate.setHours(hours, minutes);

		const dateStr = `${newDate.toISOString().split("T")[0]} ${hours
			.toString()
			.padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

		const newGame = {
			id: player.recentGames.length + 1,
			date: dateStr,
			result: (winOrLoss ? "win" : "loss") as "win" | "loss",
			score: winOrLoss
				? Math.floor(300 + Math.random() * 200)
				: Math.floor(150 + Math.random() * 150),
		};
		updatedPlayer.recentGames = [newGame, ...player.recentGames.slice(0, 4)];
	}

	if (Math.random() > 0.85) {
		const latestMonth =
			updatedPlayer.performanceData[updatedPlayer.performanceData.length - 1];
		latestMonth.kills += killsChange;
		latestMonth.deaths += deathsChange;
		latestMonth.kdRatio = parseFloat(
			(latestMonth.kills / latestMonth.deaths).toFixed(2)
		);
	}

	if (Math.random() > 0.85) {
		const latestWeek =
			updatedPlayer.accuracyData[updatedPlayer.accuracyData.length - 1];
		latestWeek.accuracy = Math.min(
			100,
			Math.max(30, latestWeek.accuracy + accuracyChange)
		);
	}

	if (Math.random() > 0.92) {
		const randomCategory = Math.floor(
			Math.random() * updatedPlayer.achievementCategories.length
		);
		const category = updatedPlayer.achievementCategories[randomCategory];

		if (category.completed < category.total) {
			category.completed += 1;
			category.progress = Math.floor(
				(category.completed / category.total) * 100
			);

			updatedPlayer.achievements.completed += 1;
			updatedPlayer.achievements.progress = Math.floor(
				(updatedPlayer.achievements.completed /
					updatedPlayer.achievements.total) *
					100
			);
		}
	}

	return updatedPlayer;
};
let notifSeq = 0;

function makeNotifId(prefix: string) {
	notifSeq += 1;
	const uuid =
		typeof crypto !== "undefined" && "randomUUID" in crypto
			? crypto.randomUUID()
			: `${Date.now()}-${notifSeq}`;
	return `${prefix}-${uuid}`;
}

export const generateNotification = (
	player: Player,
	prevPlayer: Player
): Notification | null => {
	if (
		player.recentGames[0]?.result === "win" &&
		player.recentGames[1]?.result === "win" &&
		prevPlayer.recentGames[0]?.id !== player.recentGames[0]?.id
	) {
		return {
			id: `win-streak-${player.id}-${Date.now()}`,
			type: "success",
			title: "Win Streak!",
			message: `${player.name} is on a winning streak!`,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	if (player.level > prevPlayer.level) {
		return {
			id: `level-up-${player.id}-${Date.now()}`,
			type: "success",
			title: "Level Up!",
			message: `${player.name} reached level ${player.level}!`,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	if (player.achievements.completed > prevPlayer.achievements.completed) {
		return {
			id: `achievement-${player.id}-${Date.now()}`,
			type: "info",
			title: "Achievement Unlocked!",
			message: `${player.name} unlocked a new achievement!`,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	if (player.rank < prevPlayer.rank) {
		return {
			id: `rank-up-${player.id}-${Date.now()}`,
			type: "success",
			title: "Rank Improved!",
			message: `${player.name} moved up to rank ${player.rank}!`,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	if (
		player.stats.kdRatio < prevPlayer.stats.kdRatio &&
		player.stats.kdRatio < 1.0
	) {
		return {
			id: `low-kd-${player.id}-${Date.now()}`,
			type: "warning",
			title: "Performance Alert",
			message: `${player.name}'s K/D ratio has dropped to ${player.stats.kdRatio}`,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	if (player.score - prevPlayer.score > 15) {
		return {
			id: `high-score-${player.id}-${Date.now()}`,
			type: "info",
			title: "Score Jump",
			message: `${player.name} gained ${(
				player.score - prevPlayer.score
			).toFixed(0)} points!`,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	if (Math.random() > 0.97) {
		const serverEvents = [
			{
				type: "info",
				title: "Server Maintenance",
				message: "Scheduled maintenance in 30 minutes",
			},
			{
				type: "warning",
				title: "High Server Load",
				message: "Some players may experience lag",
			},
			{
				type: "error",
				title: "Match Server Down",
				message: "Team is investigating connection issues",
			},
			{
				type: "success",
				title: "New Season",
				message: "Season 8 has officially begun!",
			},
		];

		const event = serverEvents[Math.floor(Math.random() * serverEvents.length)];
		return {
			id: makeNotifId("server"),

			type: event.type as NotificationType,
			title: event.title,
			message: event.message,
			timestamp: Date.now(),
			dismissed: false,
		};
	}

	return null;
};
