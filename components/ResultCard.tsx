"use client";

import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, Leaf } from "lucide-react";
import { useState } from "react";
import CircularProgress from "./CircularProgress";

export interface ScanResult {
    disease: string;
    confidence: number;  // 0–100
    severity: "healthy" | "mild" | "moderate" | "severe";
    description: string;
    causingAgent: string;
    symptoms: string[];
    treatment: {
        immediate: string[];
        ongoing: string[];
        chemical?: string[];
    };
    prevention: string[];
}

interface ResultCardProps {
    result: ScanResult;
}

const SEVERITY_CONFIG = {
    healthy: { color: "#10b981", bg: "#ecfdf5", label: "Healthy", icon: CheckCircle2 },
    mild: { color: "#f59e0b", bg: "#fffbeb", label: "Mild", icon: AlertTriangle },
    moderate: { color: "#f97316", bg: "#fff7ed", label: "Moderate", icon: AlertTriangle },
    severe: { color: "#ef4444", bg: "#fef2f2", label: "Severe", icon: XCircle },
};

export default function ResultCard({ result }: ResultCardProps) {
    const [treatOpen, setTreatOpen] = useState(true);
    const [prevOpen, setPrevOpen] = useState(false);

    const sev = SEVERITY_CONFIG[result.severity];
    const SevIcon = sev.icon;

    return (
        <div className="card animate-fade-in-up p-0 overflow-hidden">
            {/* ── Header banner ── */}
            <div
                className="px-6 py-5 flex items-center gap-4"
                style={{
                    background: `linear-gradient(135deg, ${sev.color}18, ${sev.color}08)`,
                    borderBottom: `1px solid ${sev.color}30`,
                }}
            >
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{ background: `${sev.color}20`, border: `2px solid ${sev.color}40` }}
                >
                    <SevIcon size={24} color={sev.color} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: sev.color }}>
                        AI Diagnosis
                    </p>
                    <h2 className="text-2xl font-extrabold leading-tight" style={{ color: "var(--text-primary)" }}>
                        {result.disease}
                    </h2>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {result.causingAgent}
                    </p>
                </div>
                <span
                    className="shrink-0 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: sev.bg, color: sev.color, border: `1px solid ${sev.color}40` }}
                >
                    {sev.label}
                </span>
            </div>

            {/* ── Body ── */}
            <div className="px-6 py-5 flex flex-col gap-6">
                {/* Confidence + description */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="shrink-0">
                        <CircularProgress
                            value={result.confidence}
                            size={130}
                            stroke={12}
                            color={sev.color}
                            trackColor={`${sev.color}20`}
                            label="Confidence"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                            About this disease
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                            {result.description}
                        </p>

                        {/* Symptoms */}
                        {result.symptoms.length > 0 && (
                            <div className="mt-3">
                                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                                    Key Symptoms
                                </p>
                                <ul className="space-y-1">
                                    {result.symptoms.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                                            <span style={{ color: sev.color, marginTop: 3 }}>•</span>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Treatment Plan (accordion) ── */}
                <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1.5px solid var(--border)" }}
                >
                    <button
                        onClick={() => setTreatOpen(!treatOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:opacity-80"
                        style={{
                            background: "linear-gradient(90deg, rgba(16,185,129,.08), rgba(16,185,129,.04))",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Leaf size={16} color="#059669" />
                            <span className="font-semibold text-sm" style={{ color: "#047857" }}>
                                Treatment Plan
                            </span>
                        </div>
                        {treatOpen ? <ChevronUp size={16} color="#059669" /> : <ChevronDown size={16} color="#059669" />}
                    </button>

                    {treatOpen && (
                        <div className="px-5 py-4 space-y-4" style={{ background: "#fafff9" }}>
                            {/* Immediate action */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#ef4444" }}>
                                    🚨 Immediate Actions
                                </p>
                                <ul className="space-y-1.5">
                                    {result.treatment.immediate.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                                            <CheckCircle2 size={15} color="#10b981" className="shrink-0 mt-0.5" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Ongoing */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#f59e0b" }}>
                                    🔄 Ongoing Management
                                </p>
                                <ul className="space-y-1.5">
                                    {result.treatment.ongoing.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                                            <CheckCircle2 size={15} color="#10b981" className="shrink-0 mt-0.5" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Chemical */}
                            {result.treatment.chemical && result.treatment.chemical.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6366f1" }}>
                                        🧪 Chemical Controls
                                    </p>
                                    <ul className="space-y-1.5">
                                        {result.treatment.chemical.map((t, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                                                <CheckCircle2 size={15} color="#6366f1" className="shrink-0 mt-0.5" />
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Prevention Tips (accordion) ── */}
                <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1.5px solid var(--border)" }}
                >
                    <button
                        onClick={() => setPrevOpen(!prevOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:opacity-80"
                        style={{
                            background: "linear-gradient(90deg, rgba(132,204,22,.08), rgba(132,204,22,.04))",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <span style={{ fontSize: 15 }}>🛡️</span>
                            <span className="font-semibold text-sm" style={{ color: "#4d7c0f" }}>
                                Prevention Tips
                            </span>
                        </div>
                        {prevOpen ? <ChevronUp size={16} color="#4d7c0f" /> : <ChevronDown size={16} color="#4d7c0f" />}
                    </button>

                    {prevOpen && (
                        <div className="px-5 py-4" style={{ background: "#f9fef3" }}>
                            <ul className="space-y-2">
                                {result.prevention.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                                        <span style={{ color: "#65a30d", fontWeight: 700, marginTop: 1 }}>{i + 1}.</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
