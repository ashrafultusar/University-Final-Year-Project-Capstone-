import { ReactNode } from "react";

interface StatCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    sub?: string;
    trend?: "up" | "down" | "neutral";
    trendLabel?: string;
    accentColor?: string;
    delay?: string;
}

export default function StatCard({
    icon,
    label,
    value,
    sub,
    trend = "neutral",
    trendLabel,
    accentColor = "#10b981",
    delay = "0ms",
}: StatCardProps) {
    const trendColor = trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#94a3b8";
    const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "•";

    return (
        <div
            className="card animate-fade-in-up p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: delay, borderLeft: `4px solid ${accentColor}` }}
        >
            {/* Icon + Label */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {label}
                </span>
                <div
                    className="flex items-center justify-center rounded-xl w-10 h-10"
                    style={{ background: `${accentColor}18`, border: `1.5px solid ${accentColor}30` }}
                >
                    <span style={{ color: accentColor }}>{icon}</span>
                </div>
            </div>

            {/* Value */}
            <div>
                <p
                    className="text-3xl font-extrabold leading-none"
                    style={{ color: "var(--text-primary)" }}
                >
                    {value}
                </p>
                {sub && (
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {sub}
                    </p>
                )}
            </div>

            {/* Trend */}
            {trendLabel && (
                <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold" style={{ color: trendColor }}>
                        {trendArrow} {trendLabel}
                    </span>
                </div>
            )}
        </div>
    );
}
