export type Player = {
  id: number;
  name: string;
  rank: number;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
  avatar: string;
  level: number;
  achievements: {
    total: number;
    completed: number;
    progress: number;
  };
  recentGames: {
    id: number;
    date: string;
    result: "win" | "loss";
    score: number;
  }[];
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    kdRatio: number;
    accuracy: number;
    headshots: number;
    playtime: number;
  };
  performanceData: {
    month: string;
    kills: number;
    deaths: number;
    kdRatio: number;
  }[];
  accuracyData: {
    week: string;
    accuracy: number;
  }[];
  gameModeData: {
    name: string;
    matches: number;
    winRate: number;
  }[];
  achievementCategories: {
    name: string;
    completed: number;
    total: number;
    progress: number;
  }[];
  recentAchievements: {
    id: number;
    name: string;
    description: string;
    date: string;
    rarity: string;
    icon: string;
    color: string;
  }[];
};

export type NotificationType = "info" | "success" | "warning" | "error";

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  title: string;
  dismissed?: boolean;
  timestamp: number;
};

export type TimeRange = "7d" | "30d" | "90d" | "all";
export type StatCategory = "overview" | "combat" | "achievements";
