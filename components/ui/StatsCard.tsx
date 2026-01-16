"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

type CardAccent = "cyan" | "rose" | "fuchsia" | "amber";

const ACCENT_STYLES: Record<
  CardAccent,
  {
    hoverBorder: string;
    overlay: string;
    glow: string;
  }
> = {
  cyan: {
    hoverBorder: "hover:border-cyan-500/50",
    overlay:
      "absolute inset-0 bg-gradient-to-r from-cyan-600/0 to-cyan-600/0 group-hover:from-cyan-600/10 group-hover:to-cyan-600/5 transition-all duration-300",
    glow:
      "absolute -inset-1 bg-cyan-500/0 group-hover:bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10",
  },
  rose: {
    hoverBorder: "hover:border-rose-500/50",
    overlay:
      "absolute inset-0 bg-gradient-to-r from-rose-600/0 to-rose-600/0 group-hover:from-rose-600/10 group-hover:to-rose-600/5 transition-all duration-300",
    glow:
      "absolute -inset-1 bg-rose-500/0 group-hover:bg-rose-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10",
  },
  fuchsia: {
    hoverBorder: "hover:border-fuchsia-500/50",
    overlay:
      "absolute inset-0 bg-gradient-to-r from-fuchsia-600/0 to-fuchsia-600/0 group-hover:from-fuchsia-600/10 group-hover:to-fuchsia-600/5 transition-all duration-300",
    glow:
      "absolute -inset-1 bg-fuchsia-500/0 group-hover:bg-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10",
  },
  amber: {
    hoverBorder: "hover:border-amber-500/50",
    overlay:
      "absolute inset-0 bg-gradient-to-r from-amber-600/0 to-amber-600/0 group-hover:from-amber-600/10 group-hover:to-amber-600/5 transition-all duration-300",
    glow:
      "absolute -inset-1 bg-amber-500/0 group-hover:bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10",
  },
};

export type StatsCardProps = {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  /** Accent is only used for card hover + glow (matches original design). */
  accent: CardAccent;
  /** Icon wrapper styling (background + text color). */
  iconClassName: string;
  /** Optional change indicator shown under the value, e.g. "+4.5%" */
  changeText?: string;
  /** Change container classes (kept identical to the original cards). */
  changeContainerClassName?: string;
  /** Change indicator text color, e.g. "text-green-400" */
  changeTextClassName?: string;
  /** Chevron fill color, e.g. "fill-green-400" */
  changeChevronClassName?: string;
  className?: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  accent,
  iconClassName,
  changeText,
  changeContainerClassName = "flex items-center",
  changeTextClassName = "text-green-400",
  changeChevronClassName = "fill-green-400",
  className = "",
}: StatsCardProps) {
  const a = ACCENT_STYLES[accent];

  return (
    <div
      className={`bg-slate-800/80 rounded-2xl p-3 md:p-5 flex flex-col relative overflow-hidden group border border-slate-700/50 ${a.hoverBorder} transition-all duration-300 ${className}`}
    >
      <div className={a.overlay}></div>
      <div className={a.glow}></div>

      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="text-slate-400 text-xs md:text-sm font-medium">
          {title}
        </div>
        <div
          className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full ${iconClassName}`}
        >
          {icon}
        </div>
      </div>

      <div className="text-xl md:text-3xl font-bold text-white">{value}</div>

      {changeText ? (
        <div className={`mt-1 md:mt-2 text-[10px] md:text-xs text-slate-400 ${changeContainerClassName} space-x-1`}>
          <span className={`${changeTextClassName} flex items-center`}>
            <ChevronRight
              className={`h-3 w-3 rotate-90 ${changeChevronClassName}`}
            />
            {changeText}
          </span>
        </div>
      ) : null}
    </div>
  );
}
