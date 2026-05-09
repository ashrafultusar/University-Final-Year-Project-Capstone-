import { Info, Cpu, Layers, Code2, GraduationCap, GitBranch, Globe } from "lucide-react";

const TECH_STACK = [
    { name: "Next.js 16", desc: "React framework", color: "#000", bg: "#f4f4f4" },
    { name: "Tailwind v4", desc: "Utility-first CSS", color: "#38bdf8", bg: "#f0f9ff" },
    { name: "Python / Flask", desc: "Backend API server", color: "#f59e0b", bg: "#fffbeb" },
    { name: "TensorFlow", desc: "ML framework", color: "#ff6c00", bg: "#fff7ed" },
    { name: "ResNet-50", desc: "CNN backbone", color: "#6366f1", bg: "#eef2ff" },
    { name: "TypeScript", desc: "Type-safe JavaScript", color: "#3b82f6", bg: "#eff6ff" },
];

const MODEL_CLASSES = [
    { label: "Potato — Early Blight", color: "#f97316" },
    { label: "Potato — Late Blight", color: "#ef4444" },
    { label: "Potato — Healthy", color: "#10b981" },
    { label: "Tomato — Healthy", color: "#84cc16" },
    { label: "Tomato — Late Blight", color: "#a855f7" },
];

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Info size={18} color="#10b981" />
                    <span className="text-sm font-semibold" style={{ color: "#10b981" }}>About This System</span>
                </div>
                <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                    About LeafScan AI
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    University Final Year Capstone Project — 2026
                </p>
            </div>

            {/* Hero description card */}
            <div
                className="rounded-2xl p-6 overflow-hidden relative animate-fade-in-up"
                style={{
                    background: "linear-gradient(135deg, #064e3b, #047857)",
                    boxShadow: "0 12px 40px rgba(6,78,59,.3)",
                }}
            >
                <div
                    className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
                    style={{ background: "#6ee7b7" }}
                />
                <div
                    className="absolute -bottom-12 -left-6 w-64 h-64 rounded-full opacity-10"
                    style={{ background: "#34d399" }}
                />
                <div className="relative">
                    <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        🎓 Capstone Project
                    </p>
                    <h2 className="text-white text-xl font-extrabold mb-3 leading-snug">
                        AI-Powered Potato Leaf Disease Detection System
                    </h2>
                    <p className="text-emerald-200 text-sm leading-relaxed">
                        This system uses deep learning to identify potato leaf diseases from photos. Built as a university capstone project,
                        it addresses a real agricultural problem — helping farmers in Bangladesh and worldwide detect diseases early,
                        reduce crop losses, and make informed treatment decisions without expert consultation.
                    </p>
                </div>
            </div>

            {/* How it works */}
            <div className="card p-6 animate-fade-in-up delay-100">
                <div className="flex items-center gap-2 mb-5">
                    <Cpu size={18} color="#6366f1" />
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>How It Works</h2>
                </div>
                <ol className="space-y-4">
                    {[
                        { step: "1", title: "Upload or Capture", desc: "Take a photo of a potato leaf or upload an existing image. The system accepts JPG, PNG, and WebP formats up to 10 MB." },
                        { step: "2", title: "AI Processing", desc: "The image is sent to a Flask backend where a fine-tuned ResNet-50 convolutional neural network classifies the leaf.", },
                        { step: "3", title: "Disease Diagnosis", desc: "The model returns a disease class and confidence score. Results are matched against a curated knowledge base.", },
                        { step: "4", title: "Treatment Plan", desc: "Detailed treatment and prevention recommendations are presented to guide the farmer's next steps.", },
                    ].map((s, i) => (
                        <li key={s.step} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                            <div
                                className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0 font-bold text-sm"
                                style={{ background: "#6366f110", color: "#6366f1", border: "2px solid #6366f130" }}
                            >
                                {s.step}
                            </div>
                            <div>
                                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{s.title}</p>
                                <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Model classes */}
            <div className="card p-6 animate-fade-in-up delay-200">
                <div className="flex items-center gap-2 mb-4">
                    <Layers size={18} color="#10b981" />
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Model Classes</h2>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    The model was trained on the PlantVillage dataset and can classify the following leaf conditions:
                </p>
                <div className="space-y-2">
                    {MODEL_CLASSES.map((c) => (
                        <div
                            key={c.label}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                            style={{ background: `${c.color}10`, border: `1px solid ${c.color}25` }}
                        >
                            <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ background: c.color, boxShadow: `0 0 5px ${c.color}60` }}
                            />
                            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech stack */}
            <div className="card p-6 animate-fade-in-up delay-300">
                <div className="flex items-center gap-2 mb-4">
                    <Code2 size={18} color="#f59e0b" />
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Tech Stack</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TECH_STACK.map((t) => (
                        <div
                            key={t.name}
                            className="p-3 rounded-xl flex items-start gap-2"
                            style={{ background: t.bg, border: `1px solid ${t.color}25` }}
                        >
                            <div
                                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                style={{ background: t.color }}
                            />
                            <div>
                                <p className="font-bold text-sm" style={{ color: t.color }}>{t.name}</p>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credit + links */}
            <div className="card p-6 animate-fade-in-up delay-400">
                <div className="flex items-center gap-2 mb-4">
                    <GraduationCap size={18} color="#10b981" />
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Project Info</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {[
                        { label: "Project Type", value: "University Final Year Capstone" },
                        { label: "Domain", value: "AgriTech / Computer Vision" },
                        { label: "Dataset", value: "PlantVillage (54,000+ images)" },
                        { label: "Model Accuracy", value: "97.8% (test set)" },
                        { label: "Training Epochs", value: "50 epochs, batch size 32" },
                        { label: "Year", value: "2026" },
                    ].map((f) => (
                        <div key={f.label}>
                            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                                {f.label}
                            </p>
                            <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--text-primary)" }}>{f.value}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <a
                        href="https://github.com/ashrafultusar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                        style={{ background: "#18181b", color: "#fff" }}
                    >
                        <GitBranch size={15} /> GitHub
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                        style={{
                            background: "rgba(16,185,129,.1)",
                            color: "#059669",
                            border: "1.5px solid rgba(16,185,129,.3)",
                        }}
                    >
                        <Globe size={15} /> Live Demo
                    </a>
                </div>
            </div>
        </div>
    );
}
