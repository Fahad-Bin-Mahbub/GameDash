"use client";

import * as React from "react";
import { Activity, BarChart2, Flame, Target } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import ChartCard from "@/components/ui/ChartCard";
import { formatMatchDate } from "@/lib/utils";
import type { Player } from "@/lib/types";

export function PerformanceOverTimeChart({
	performanceData,
}: {
	performanceData: Player["performanceData"];
}) {
	return (
		<ChartCard
			title="Performance Over Time"
			icon={<Activity />}
			iconColor="text-cyan-400"
		>
			<div className="h-64 md:h-80">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={performanceData}>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#3f3f46"
							vertical={false}
						/>
						<XAxis dataKey="month" stroke="#a1a1aa" tick={{ fontSize: 11 }} />
						<YAxis stroke="#a1a1aa" tick={{ fontSize: 11 }} />
						<Tooltip
							contentStyle={{
								backgroundColor: "#18181b",
								borderColor: "#27272a",
								borderRadius: "0.375rem",
								boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
								color: "#f4f4f5",
							}}
							cursor={{
								stroke: "#52525b",
								strokeWidth: 1,
								strokeDasharray: "5 5",
							}}
						/>
						<Legend wrapperStyle={{ paddingTop: "20px", fontSize: 12 }} />
						<Line
							type="monotone"
							dataKey="kills"
							stroke="#22d3ee"
							strokeWidth={2}
							dot={{ r: 3, strokeWidth: 2 }}
							activeDot={{ r: 5 }}
						/>
						<Line
							type="monotone"
							dataKey="deaths"
							stroke="#ef4444"
							strokeWidth={2}
							dot={{ r: 3, strokeWidth: 2 }}
							activeDot={{ r: 5 }}
						/>
						<Line
							type="monotone"
							dataKey="kdRatio"
							stroke="#f59e0b"
							strokeWidth={2}
							dot={{ r: 3, strokeWidth: 2 }}
							activeDot={{ r: 5 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</ChartCard>
	);
}

export function GameModeStatisticsChart({
	gameModeData,
}: {
	gameModeData: Player["gameModeData"];
}) {
	return (
		<div className="mt-4 md:mt-8">
			<ChartCard
				title="Game Mode Statistics"
				icon={<BarChart2 />}
				iconColor="text-fuchsia-400"
			>
				<div className="h-60 md:h-72">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={gameModeData}>
							<defs>
								<linearGradient
									id="matchesGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#22d3ee" stopOpacity={0.6} />
								</linearGradient>

								<linearGradient
									id="winRateGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#c084fc" stopOpacity={0.6} />
								</linearGradient>

								<pattern
									id="pattern-circles"
									x="0"
									y="0"
									width="10"
									height="10"
									patternUnits="userSpaceOnUse"
									patternContentUnits="userSpaceOnUse"
								>
									<circle
										cx="5"
										cy="5"
										r="1"
										fill="rgba(255, 255, 255, 0.05)"
									/>
								</pattern>

								<linearGradient
									id="tooltipGradient"
									x1="0"
									y1="0"
									x2="1"
									y2="1"
								>
									<stop offset="0%" stopColor="rgba(15, 23, 42, 0.95)" />
									<stop offset="100%" stopColor="rgba(30, 41, 59, 0.95)" />
								</linearGradient>
							</defs>

							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(148, 163, 184, 0.15)"
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								stroke="#94a3b8"
								tick={{ fill: "#cbd5e1", fontSize: 11 }}
								axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
							/>
							<YAxis
								stroke="#94a3b8"
								tick={{ fill: "#cbd5e1", fontSize: 11 }}
								axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
							/>
							<Tooltip
								contentStyle={{
									background: "url(#tooltipGradient)",
									backgroundColor: "transparent",
									borderColor: "rgba(100, 116, 139, 0.3)",
									borderRadius: "0.75rem",
									boxShadow:
										"0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
									color: "#f8fafc",
									padding: "16px",
									fontWeight: "500",
									backdropFilter: "blur(12px)",
									border: "1px solid rgba(148, 163, 184, 0.15)",
									minWidth: "180px",
								}}
								cursor={{ fill: "rgba(100, 116, 139, 0.1)" }}
								formatter={(value, name) => {
									const color = name === "matches" ? "#22d3ee" : "#a855f7";
									return [
										<span
											key="value"
											style={{
												color: "#f8fafc",
												fontSize: "1rem",
												fontWeight: "600",
												textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
											}}
										>
											{value}
											{name === "winRate" && "%"}
										</span>,
										<span
											key="label"
											style={{
												display: "flex",
												alignItems: "center",
												color: "#cbd5e1",
												fontSize: "0.875rem",
												fontWeight: "500",
											}}
										>
											<span
												style={{
													display: "inline-block",
													width: "8px",
													height: "8px",
													borderRadius: "50%",
													backgroundColor: color,
													marginRight: "6px",
													boxShadow: "0 0 6px {color}",
												}}
											></span>
											{name === "matches" ? "Matches Played" : "Win Rate"}
										</span>,
									];
								}}
								labelFormatter={(label) => {
									return String(label) + " (Game Mode)";
								}}
								wrapperStyle={{
									outline: "none",
									filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
								}}
							/>
							<Legend
								wrapperStyle={{ paddingTop: "20px" }}
								formatter={(value) => (
									<span style={{ color: "#e2e8f0", fontSize: "0.875rem" }}>
										{value}
									</span>
								)}
							/>
							<Bar
								dataKey="matches"
								name="matches"
								fill="url(#matchesGradient)"
								fillOpacity="0.9"
								stroke="#0ea5e9"
								strokeWidth={1}
								radius={[6, 6, 0, 0]}
								barSize={20}
							>
								<rect
									x="0"
									y="0"
									width="100%"
									height="100%"
									fill="url(#pattern-circles)"
								/>
							</Bar>
							<Bar
								dataKey="winRate"
								name="winRate"
								fill="url(#winRateGradient)"
								fillOpacity="0.9"
								stroke="#8b5cf6"
								strokeWidth={1}
								radius={[6, 6, 0, 0]}
								barSize={20}
							>
								<rect
									x="0"
									y="0"
									width="100%"
									height="100%"
									fill="url(#pattern-circles)"
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</ChartCard>
		</div>
	);
}

export function RecentMatchesPerformanceChart({
	recentGames,
}: {
	recentGames: Player["recentGames"];
}) {
	return (
		<ChartCard
			title="Recent Matches Performance"
			icon={<Flame />}
			iconColor="text-red-500"
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-4 text-xs">
					<div className="flex items-center space-x-1.5">
						<div className="w-3 h-3 rounded-sm bg-gradient-to-r from-green-500 to-green-400"></div>
						<span className="text-slate-300">Victory</span>
					</div>
					<div className="flex items-center space-x-1.5">
						<div className="w-3 h-3 rounded-sm bg-red-600"></div>
						<span className="text-slate-300">Defeat</span>
					</div>
				</div>
				<div className="text-xs text-slate-400">Score by Match Result</div>
			</div>
			<div className="h-60 md:h-72">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={recentGames}>
						<defs>
							<linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#22d3ee" stopOpacity={0.6} />
							</linearGradient>

							<linearGradient id="winGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#34d399" stopOpacity={0.6} />
							</linearGradient>

							<linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#f87171" stopOpacity={0.6} />
							</linearGradient>

							<pattern
								id="patternScore"
								x="0"
								y="0"
								width="10"
								height="10"
								patternUnits="userSpaceOnUse"
								patternContentUnits="userSpaceOnUse"
							>
								<circle cx="5" cy="5" r="1" fill="rgba(255, 255, 255, 0.05)" />
							</pattern>

							<linearGradient
								id="tooltipGradientCombat"
								x1="0"
								y1="0"
								x2="1"
								y2="1"
							>
								<stop offset="0%" stopColor="rgba(15, 23, 42, 0.95)" />
								<stop offset="100%" stopColor="rgba(30, 41, 59, 0.95)" />
							</linearGradient>
						</defs>

						<CartesianGrid
							strokeDasharray="3 3"
							stroke="rgba(148, 163, 184, 0.15)"
							vertical={false}
						/>
						<XAxis
							dataKey="date"
							stroke="#94a3b8"
							tick={{ fill: "#cbd5e1", fontSize: 11 }}
							axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
							tickFormatter={formatMatchDate}
						/>
						<YAxis
							stroke="#94a3b8"
							tick={{ fill: "#cbd5e1", fontSize: 11 }}
							axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
						/>
						<Tooltip
							contentStyle={{
								background: "url(#tooltipGradientCombat)",
								backgroundColor: "transparent",
								borderColor: "rgba(100, 116, 139, 0.3)",
								borderRadius: "0.75rem",
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
								color: "#f8fafc",
								padding: "16px",
								fontWeight: "500",
								backdropFilter: "blur(12px)",
								border: "1px solid rgba(148, 163, 184, 0.15)",
								minWidth: "180px",
							}}
							cursor={{ fill: "rgba(100, 116, 139, 0.1)" }}
							formatter={(value, _name, props: any) => {
								const result = props.payload.result;
								return [
									<span
										key="value"
										style={{
											color: "#f8fafc",
											fontSize: "1rem",
											fontWeight: "600",
											textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
										}}
									>
										{value} points
									</span>,
									<span
										key="label"
										style={{
											display: "flex",
											alignItems: "center",
											color: "#cbd5e1",
											fontSize: "0.875rem",
											fontWeight: "500",
										}}
									>
										<span
											style={{
												display: "inline-block",
												width: "8px",
												height: "8px",
												borderRadius: "50%",
												backgroundColor:
													result === "win" ? "#10b981" : "#ef4444",
												marginRight: "6px",
												boxShadow: `0 0 6px ${
													result === "win" ? "#10b981" : "#ef4444"
												}`,
											}}
										></span>
										{result === "win" ? "Victory" : "Defeat"} - Score
									</span>,
								];
							}}
							labelFormatter={(label) =>
								`Date: ${formatMatchDate(String(label))}`
							}
							wrapperStyle={{
								outline: "none",
								filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
							}}
						/>
						<Legend
							wrapperStyle={{ paddingTop: "20px", fontSize: 12 }}
							formatter={(value) => (
								<span
									style={{
										color: "#e2e8f0",
										fontSize: "0.875rem",
										fontWeight: "500",
									}}
								>
									{value === "result" ? "Match Result" : value}
								</span>
							)}
						/>
						<Bar
							dataKey="score"
							name="Performance"
							radius={[6, 6, 0, 0]}
							barSize={40}
						>
							{recentGames.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={
										entry.result === "win"
											? "url(#winGradient)"
											: "url(#lossGradient)"
									}
									stroke={entry.result === "win" ? "#10b981" : "#ef4444"}
									strokeWidth={1}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</ChartCard>
	);
}

export function AccuracyTrendChart({
	accuracyData,
}: {
	accuracyData: Player["accuracyData"];
}) {
	return (
		<div className="mt-4 md:mt-8">
			<ChartCard
				title="Accuracy Trend"
				icon={<Target />}
				iconColor="text-blue-500"
			>
				<div className="h-60 md:h-72">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={accuracyData}>
							<defs>
								<linearGradient
									id="accuracyGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#22d3ee" stopOpacity={0.3} />
								</linearGradient>

								<linearGradient
									id="accuracyAreaGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
								</linearGradient>

								<linearGradient
									id="tooltipGradientAccuracy"
									x1="0"
									y1="0"
									x2="1"
									y2="1"
								>
									<stop offset="0%" stopColor="rgba(15, 23, 42, 0.95)" />
									<stop offset="100%" stopColor="rgba(30, 41, 59, 0.95)" />
								</linearGradient>

								<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
									<feGaussianBlur stdDeviation="2" result="blur" />
									<feComposite in="SourceGraphic" in2="blur" operator="over" />
								</filter>
							</defs>

							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(148, 163, 184, 0.15)"
								vertical={false}
							/>
							<XAxis
								dataKey="week"
								stroke="#94a3b8"
								tick={{ fill: "#cbd5e1", fontSize: 11 }}
								axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
							/>
							<YAxis
								domain={[40, 80]}
								stroke="#94a3b8"
								tick={{ fill: "#cbd5e1", fontSize: 11 }}
								axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
							/>
							<Tooltip
								contentStyle={{
									background: "url(#tooltipGradientAccuracy)",
									backgroundColor: "transparent",
									borderColor: "rgba(100, 116, 139, 0.3)",
									borderRadius: "0.75rem",
									boxShadow:
										"0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
									color: "#f8fafc",
									padding: "16px",
									fontWeight: "500",
									backdropFilter: "blur(12px)",
									border: "1px solid rgba(148, 163, 184, 0.15)",
									minWidth: "180px",
								}}
								cursor={{
									stroke: "#94a3b8",
									strokeWidth: 1,
									strokeDasharray: "5 5",
								}}
								formatter={(value) => [
									<span
										key="value"
										style={{
											color: "#f8fafc",
											fontSize: "1rem",
											fontWeight: "600",
											textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
										}}
									>
										{value}%
									</span>,
									<span
										key="label"
										style={{
											display: "flex",
											alignItems: "center",
											color: "#cbd5e1",
											fontSize: "0.875rem",
											fontWeight: "500",
										}}
									>
										<span
											style={{
												display: "inline-block",
												width: "8px",
												height: "8px",
												borderRadius: "50%",
												backgroundColor: "#3b82f6",
												marginRight: "6px",
												boxShadow: "0 0 6px #3b82f6",
											}}
										></span>
										Accuracy
									</span>,
								]}
								labelFormatter={(label) => {
									return `${label} (Time Period)`;
								}}
								wrapperStyle={{
									outline: "none",
									filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
								}}
							/>
							<Legend
								wrapperStyle={{ paddingTop: "20px" }}
								formatter={(value) => (
									<span
										style={{
											color: "#e2e8f0",
											fontSize: "0.875rem",
											fontWeight: "500",
										}}
									>
										{value}
									</span>
								)}
							/>

							<defs>
								<clipPath id="clipPath">
									<rect x="0" y="0" width="100%" height="100%" />
								</clipPath>
							</defs>
							<g clipPath="url(#clipPath)">
								<path
									d={`M0,${80} 
           L0,${50} 
           ${accuracyData
							.map(
								(entry, index) =>
									`L${index * (100 / (accuracyData.length - 1))}%,${
										80 - (entry.accuracy - 40) * (100 / 40)
									}%`
							)
							.join(" ")}
           L100%,${50} 
           L100%,${80} Z`}
									fill="url(#accuracyAreaGradient)"
									stroke="none"
								/>
							</g>

							<Line
								type="monotone"
								dataKey="accuracy"
								name="Accuracy %"
								stroke="url(#accuracyGradient)"
								strokeWidth={3}
								dot={{
									r: 4,
									fill: "#3b82f6",
									strokeWidth: 2,
									stroke: "#1d4ed8",
									filter: "url(#glow)",
								}}
								activeDot={{
									r: 6,
									fill: "#60a5fa",
									stroke: "#2563eb",
									strokeWidth: 2,
								}}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</ChartCard>
		</div>
	);
}
