import { ShieldCheck, Thermometer, Droplets, Wind, AlertTriangle, CheckCircle2 } from "lucide-react";
import DiseaseInfo, { DiseaseInfoData } from "@/components/DiseaseInfo";

const DISEASES: DiseaseInfoData[] = [
    {
        name: "Late Blight",
        emoji: "🍂",
        pathogen: "Phytophthora infestans (oomycete)",
        riskLevel: "critical",
        affectedStages: ["Vegetative", "Tuber Bulking", "Maturation"],
        spreadMethod: "Wind-dispersed sporangia; waterborne zoospores in cool, wet weather",
        lifecycle: "Primary infection from infected seed tubers or volunteer plants; secondary spread via airborne spores within 3–5 days under favourable conditions",
    },
    {
        name: "Early Blight",
        emoji: "🍁",
        pathogen: "Alternaria solani (fungus)",
        riskLevel: "high",
        affectedStages: ["Vegetative", "Flowering", "Tuber Set"],
        spreadMethod: "Wind and rain splash; conidia dispersed in warm, humid conditions",
        lifecycle: "Overwinters in soil and plant debris; re-infects in spring; progresses from lower to upper leaves over 2–3 weeks",
    },
    {
        name: "Leaf Roll Virus",
        emoji: "🌿",
        pathogen: "Potato Leafroll Virus — PLRV (Luteovirus)",
        riskLevel: "high",
        affectedStages: ["All growth stages"],
        spreadMethod: "Persistent transmission by Myzus persicae (green peach aphid)",
        lifecycle: "Virus acquired by aphids within 30 min; transmitted after 12–24h latency period; persists in aphid for life but not passed to offspring",
    },
    {
        name: "Bacterial Wilt",
        emoji: "🌱",
        pathogen: "Ralstonia solanacearum (bacterium)",
        riskLevel: "critical",
        affectedStages: ["Vegetative", "Tuber Bulking"],
        spreadMethod: "Soil-borne; enters through roots or wounds; spread via contaminated irrigation water and tools",
        lifecycle: "Bacteria colonise xylem vessels causing wilting; multiply rapidly at temperatures above 25°C; highly persistent in soil for years",
    },
    {
        name: "Common Scab",
        emoji: "🥔",
        pathogen: "Streptomyces scabies (actinomycete)",
        riskLevel: "medium",
        affectedStages: ["Tuber Initiation", "Tuber Bulking"],
        spreadMethod: "Soil-borne; thrives in alkaline, dry soils; spreads via infected seed tubers",
        lifecycle: "Bacteria infect young tuber skin through lenticels; symptoms appear at harvest; survives indefinitely in soil",
    },
];

const WEATHER_RISK = [
    {
        icon: Thermometer,
        label: "Temperature",
        ideal: "10–20°C",
        risk: "Cool & moist conditions favour Late Blight",
        color: "#6366f1",
    },
    {
        icon: Droplets,
        label: "Humidity",
        ideal: "> 90%",
        risk: "High humidity for 12+ hours triggers spore germination",
        color: "#3b82f6",
    },
    {
        icon: Wind,
        label: "Wind Speed",
        ideal: "Moderate breeze",
        risk: "Strong winds spread fungal spores to healthy plants",
        color: "#f59e0b",
    },
];

const GENERAL_TIPS = [
    "Inspect your field every 3–4 days during the growing season",
    "Keep a spray diary — record all fungicide applications with dates and products",
    "Use certified disease-free seed tubers every season",
    "Practice a minimum 3-year crop rotation with non-Solanaceous crops",
    "Maintain proper drainage channels — standing water spreads root diseases",
    "Train farm workers to identify early disease symptoms",
    "Store harvested tubers at 4–8°C in ventilated, dark storage",
    "Report unusual disease outbreaks to local agricultural extension officers",
];

export default function PreventionPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={18} color="#10b981" />
                    <span className="text-sm font-semibold" style={{ color: "#10b981" }}>Disease Management</span>
                </div>
                <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                    Prevention Guide
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    Evidence-based strategies to keep your potato crop healthy
                </p>
            </div>

            {/* Weather risk indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {WEATHER_RISK.map(({ icon: Icon, label, ideal, risk, color }) => (
                    <div
                        key={label}
                        className="card p-5 animate-fade-in-up"
                        style={{ borderLeft: `4px solid ${color}` }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Icon size={18} color={color} />
                            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{label}</span>
                        </div>
                        <p className="text-2xl font-extrabold mb-1" style={{ color }}>{ideal}</p>
                        <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{risk}</p>
                    </div>
                ))}
            </div>

            {/* Disease-specific info */}
            <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                    🦠 Disease Reference Library
                </h2>
                <div className="space-y-3">
                    {DISEASES.map((d, i) => (
                        <div key={d.name} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                            <DiseaseInfo disease={d} defaultOpen={i === 0} />
                        </div>
                    ))}
                </div>
            </div>

            {/* General prevention checklist */}
            <div className="card p-6 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-5">
                    <AlertTriangle size={18} color="#f59e0b" />
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                        General Field Management Checklist
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GENERAL_TIPS.map((tip, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3 p-3 rounded-xl animate-fade-in-up"
                            style={{
                                background: "rgba(16,185,129,.05)",
                                border: "1px solid rgba(16,185,129,.15)",
                                animationDelay: `${i * 50}ms`,
                            }}
                        >
                            <CheckCircle2 size={16} color="#10b981" className="shrink-0 mt-0.5" />
                            <span className="text-sm" style={{ color: "var(--text-primary)" }}>{tip}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
