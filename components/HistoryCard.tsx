import Image from "next/image";
import { Calendar, Percent, AlertTriangle, CheckCircle2 } from "lucide-react";

export interface HistoryItem {
    id: string;
    imageUrl: string;
    disease: string;
    confidence: number;
    severity: "healthy" | "mild" | "moderate" | "severe";
    date: string;
    imageAlt?: string;
}

const SEV_COLORS = {
    healthy: { color: "#10b981", bg: "#ecfdf5", label: "Healthy" },
    mild: { color: "#f59e0b", bg: "#fffbeb", label: "Mild" },
    moderate: { color: "#f97316", bg: "#fff7ed", label: "Moderate" },
    severe: { color: "#ef4444", bg: "#fef2f2", label: "Severe" },
};

export default function HistoryCard({ item }: { item: HistoryItem }) {
    const sev = SEV_COLORS[item.severity];
    const IsHealthy = item.severity === "healthy";

    return (
        <div
            className="card overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in-up cursor-pointer group"
            style={{ borderTop: `3px solid ${sev.color}` }}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden" style={{ height: 140 }}>
                <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.disease}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay badge */}
                <div className="absolute top-2 right-2">
                    <span
                        className="px-2 py-1 rounded-lg text-[11px] font-bold"
                        style={{
                            background: sev.bg,
                            color: sev.color,
                            border: `1px solid ${sev.color}40`,
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        {sev.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start gap-2 mb-3">
                    {IsHealthy
                        ? <CheckCircle2 size={16} color={sev.color} className="shrink-0 mt-0.5" />
                        : <AlertTriangle size={16} color={sev.color} className="shrink-0 mt-0.5" />
                    }
                    <h3
                        className="font-bold text-[14px] leading-snug"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {item.disease}
                    </h3>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                        <Calendar size={12} />
                        <span className="text-[11px]">{item.date}</span>
                    </div>
                    <div
                        className="flex items-center gap-1 px-2 py-1 rounded-lg"
                        style={{ background: `${sev.color}12` }}
                    >
                        <Percent size={11} color={sev.color} />
                        <span className="text-[12px] font-bold" style={{ color: sev.color }}>
                            {item.confidence}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
