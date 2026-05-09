"use client";

import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useState } from "react";

export interface DiseaseInfoData {
    name: string;
    emoji: string;
    pathogen: string;
    affectedStages: string[];
    spreadMethod: string;
    lifecycle: string;
    riskLevel: "low" | "medium" | "high" | "critical";
}

const RISK_COLORS = {
    low: { color: "#10b981", bg: "#ecfdf5", label: "Low Risk" },
    medium: { color: "#f59e0b", bg: "#fffbeb", label: "Medium Risk" },
    high: { color: "#f97316", bg: "#fff7ed", label: "High Risk" },
    critical: { color: "#ef4444", bg: "#fef2f2", label: "Critical Risk" },
};

interface DiseaseInfoProps {
    disease: DiseaseInfoData;
    defaultOpen?: boolean;
}

export default function DiseaseInfo({ disease, defaultOpen = false }: DiseaseInfoProps) {
    const [open, setOpen] = useState(defaultOpen);
    const risk = RISK_COLORS[disease.riskLevel];

    return (
        <div
            className="card overflow-hidden"
            style={{ border: `1.5px solid ${risk.color}25` }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 p-5 text-left transition-colors hover:opacity-90"
                style={{
                    background: `linear-gradient(90deg, ${risk.color}10, ${risk.color}04)`,
                }}
            >
                <span className="text-2xl">{disease.emoji}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>
                            {disease.name}
                        </span>
                        <span
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                            style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.color}30` }}
                        >
                            {risk.label}
                        </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {disease.pathogen}
                    </p>
                </div>
                <BookOpen size={16} color={risk.color} className="shrink-0 mr-1" />
                {open
                    ? <ChevronUp size={18} color={risk.color} className="shrink-0" />
                    : <ChevronDown size={18} color={risk.color} className="shrink-0" />
                }
            </button>

            {open && (
                <div className="px-5 pb-5 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">
                    <InfoField label="Pathogen" value={disease.pathogen} />
                    <InfoField label="Spread Method" value={disease.spreadMethod} />
                    <InfoField
                        label="Affected Growth Stages"
                        value={disease.affectedStages.join(", ")}
                    />
                    <InfoField label="Disease Lifecycle" value={disease.lifecycle} />
                </div>
            )}
        </div>
    );
}

function InfoField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                {label}
            </p>
            <p className="text-[13px]" style={{ color: "var(--text-primary)" }}>
                {value}
            </p>
        </div>
    );
}
