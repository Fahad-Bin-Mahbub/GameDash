"use client";

import React from "react";

export interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  children: React.ReactNode;
}

export default function ChartCard({ title, icon, iconColor, children }: ChartCardProps) {
  return (
    <div className="bg-slate-800/80 rounded-xl p-4 md:p-5 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/0 to-slate-700/0 group-hover:from-slate-700/10 group-hover:to-slate-700/5 transition-all duration-300"></div>

      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
        <h3 className="text-sm md:text-lg font-bold text-white flex items-center">
          <span className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${iconColor}`}>{icon}</span>
          {title}
        </h3>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
