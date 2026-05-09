import { History, Filter, Search, Download } from "lucide-react";
import HistoryCard, { HistoryItem } from "@/components/HistoryCard";

const HISTORY: HistoryItem[] = [
    {
        id: "1",
        imageUrl: "/assets/history/LateBlight.jpeg",
        disease: "Late Blight",
        confidence: 94,
        severity: "severe",
        date: "May 9, 2026 — 09:42 AM",
        imageAlt: "Late Blight on potato leaf",
    },
    {
        id: "2",
        imageUrl: "/assets/history/LateBlight.jpeg",
        disease: "Early Blight",
        confidence: 87,
        severity: "moderate",
        date: "May 9, 2026 — 08:15 AM",
        imageAlt: "Early Blight on potato leaf",
    },
    {
        id: "3",
        imageUrl: "/assets/history/HealthyLeaf.jpeg",
        disease: "Healthy Leaf",
        confidence: 99,
        severity: "healthy",
        date: "May 8, 2026 — 04:20 PM",
        imageAlt: "Healthy potato leaf",
    },
    {
        id: "4",
        imageUrl: "/assets/history/BacterialWilt.jpeg",
        disease: "Bacterial Wilt",
        confidence: 78,
        severity: "moderate",
        date: "May 8, 2026 — 11:00 AM",
        imageAlt: "Bacterial Wilt on potato leaf",
    },
    {
        id: "5",
        imageUrl: "/assets/history/LeafRollVirus.jpeg",
        disease: "Leaf Roll Virus",
        confidence: 82,
        severity: "mild",
        date: "May 7, 2026 — 02:30 PM",
        imageAlt: "Leaf Roll Virus on potato leaf",
    },
    {
        id: "6",
        imageUrl: "/assets/history/HealthyLeaf.jpeg",
        disease: "Healthy Leaf",
        confidence: 97,
        severity: "healthy",
        date: "May 7, 2026 — 10:05 AM",
        imageAlt: "Healthy potato leaf",
    },
];

export default function HistoryPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <History size={18} color="#10b981" />
                        <span className="text-sm font-semibold" style={{ color: "#10b981" }}>Scan Records</span>
                    </div>
                    <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>History</h1>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                        All previous leaf scans and diagnoses
                    </p>
                </div>
                <button
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-80"
                    style={{
                        background: "var(--emerald-50)",
                        color: "#059669",
                        border: "1.5px solid var(--emerald-200)",
                    }}
                >
                    <Download size={15} />
                    Export CSV
                </button>
            </div>

            {/* Filter bar */}
            <div className="card p-4 flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div
                    className="flex items-center gap-2 flex-1 rounded-xl px-3 py-2.5"
                    style={{ background: "var(--bg)", border: "1.5px solid var(--border)" }}
                >
                    <Search size={15} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search by disease name…"
                        className="flex-1 bg-transparent text-sm outline-none"
                        style={{ color: "var(--text-primary)" }}
                    />
                </div>
                {/* Filter chips */}
                <div className="flex flex-wrap gap-2">
                    {["All", "Healthy", "Mild", "Moderate", "Severe"].map((f, i) => (
                        <button
                            key={f}
                            className="px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
                            style={{
                                background: i === 0 ? "#059669" : "var(--bg)",
                                color: i === 0 ? "#fff" : "var(--text-secondary)",
                                border: i === 0 ? "none" : "1.5px solid var(--border)",
                            }}
                        >
                            {f}
                        </button>
                    ))}
                    <button
                        className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold"
                        style={{
                            background: "var(--bg)",
                            color: "var(--text-secondary)",
                            border: "1.5px solid var(--border)",
                        }}
                    >
                        <Filter size={12} /> Filter
                    </button>
                </div>
            </div>

            {/* Summary strip */}
            <div
                className="rounded-xl px-5 py-3 flex flex-wrap gap-6 animate-fade-in-up"
                style={{ background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.15)" }}
            >
                {[
                    { label: "Total", value: "6", color: "#10b981" },
                    { label: "Healthy", value: "2", color: "#10b981" },
                    { label: "Diseased", value: "4", color: "#ef4444" },
                    { label: "Avg. Confidence", value: "89%", color: "#6366f1" },
                ].map((s) => (
                    <div key={s.label}>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                        <p className="font-extrabold text-lg" style={{ color: s.color }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HISTORY.map((item, i) => (
                    <div key={item.id} style={{ animationDelay: `${i * 80}ms` }}>
                        <HistoryCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
