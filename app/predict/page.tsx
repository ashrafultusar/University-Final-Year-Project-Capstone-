"use client";

import { useState, useCallback } from "react";
import FileUpload from "@/components/FileUpload";
import ScanningAnimation from "@/components/ScanningAnimation";
import ResultCard, { ScanResult } from "@/components/ResultCard";
import { ScanLine, RotateCcw, Info } from "lucide-react";

type State = "idle" | "uploaded" | "scanning" | "result";

/* ── Mock result data ── */
const MOCK_RESULT: ScanResult = {
    disease: "Late Blight Detected",
    confidence: 94,
    severity: "severe",
    causingAgent: "Phytophthora infestans (water mould)",
    description:
        "Late blight is one of the most destructive diseases of potato plants, caused by the oomycete pathogen Phytophthora infestans. It can destroy an entire crop within days under favourable cool, moist conditions. The disease caused the Irish Potato Famine of the 1840s.",
    symptoms: [
        "Dark, water-soaked lesions on leaves (especially lower surfaces)",
        "White fluffy sporulation on the underside of leaves in humid weather",
        "Rapid browning and collapse of affected plant tissue",
        "Infected tubers develop reddish-brown discolouration beneath skin",
    ],
    treatment: {
        immediate: [
            "Remove and destroy all visibly infected plant tissue immediately",
            "Do not leave infected debris in the field — bag and burn or bury deep",
            "Stop overhead irrigation to reduce leaf wetness",
            "Isolate affected rows if possible to slow spread",
        ],
        ongoing: [
            "Monitor remaining plants daily for new symptoms",
            "Improve inter-row spacing to increase air circulation",
            "Harvest tubers promptly once foliage dies back",
            "Avoid storing infected tubers with healthy ones",
        ],
        chemical: [
            "Apply cymoxanil + mancozeb (Curzate®) as a protective spray",
            "Metalaxyl-based fungicides (Ridomil Gold®) for systemic control",
            "Rotate chemical groups to avoid resistance development",
            "Spray every 7–10 days during high-risk weather conditions",
        ],
    },
    prevention: [
        "Use certified disease-free seed potatoes from reputable suppliers",
        "Choose blight-resistant varieties (e.g., Sarpo Mira, Toluca)",
        "Apply preventive copper-based fungicide sprays before symptoms appear",
        "Ensure adequate plant spacing and good drainage to reduce humidity",
        "Practice a 3–4 year crop rotation, avoiding Solanaceae family crops",
        "Monitor weather forecasts — blight risk is highest in cool (10–25°C), wet conditions",
        "Install weather-based blight warning systems or use online DSS tools",
    ],
};

export default function PredictPage() {
    const [state, setState] = useState<State>("idle");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFile = useCallback((file: File) => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setState("uploaded");
    }, []);

    const handleClear = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setState("idle");
    };

    const handleAnalyse = () => {
        setState("scanning");
        // Simulate AI processing delay
        setTimeout(() => setState("result"), 3000);
    };

    const handleReset = () => {
        handleClear();
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <ScanLine size={18} color="#10b981" />
                        <span className="text-sm font-semibold" style={{ color: "#10b981" }}>
                            AI Analysis
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                        Smart Scan
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                        Upload or capture a potato leaf to get an instant AI diagnosis
                    </p>
                </div>
                {state === "result" && (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03]"
                        style={{
                            background: "var(--emerald-50)",
                            color: "#059669",
                            border: "1.5px solid var(--emerald-200)",
                        }}
                    >
                        <RotateCcw size={16} />
                        New Scan
                    </button>
                )}
            </div>

            {/* ── Tip banner ── */}
            {state === "idle" && (
                <div
                    className="flex items-start gap-3 rounded-xl px-4 py-3 animate-fade-in-up"
                    style={{
                        background: "rgba(16,185,129,.07)",
                        border: "1px solid rgba(16,185,129,.2)",
                    }}
                >
                    <Info size={16} color="#10b981" className="shrink-0 mt-0.5" />
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        <strong>Best results tip:</strong> Use a clear, well-lit photo of a single leaf. Avoid blurry or dark images. The AI works best with images taken outdoors in natural light.
                    </p>
                </div>
            )}

            {/* ── Main scan card ── */}
            <div className="card p-6">
                {state === "idle" && (
                    <FileUpload
                        onFile={handleFile}
                        onClear={handleClear}
                        previewUrl={null}
                        disabled={false}
                    />
                )}

                {state === "uploaded" && previewUrl && (
                    <div className="space-y-5">
                        <FileUpload
                            onFile={handleFile}
                            onClear={handleClear}
                            previewUrl={previewUrl}
                            disabled={false}
                        />
                        <button
                            onClick={handleAnalyse}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 font-bold text-lg text-white transition-all hover:scale-[1.02] active:scale-[.98]"
                            style={{
                                background: "linear-gradient(135deg, #059669, #047857)",
                                boxShadow: "0 8px 24px rgba(5,150,105,.4)",
                            }}
                        >
                            <ScanLine size={22} />
                            Analyse Leaf Now
                        </button>
                    </div>
                )}

                {state === "scanning" && previewUrl && (
                    <ScanningAnimation imageUrl={previewUrl} />
                )}

                {state === "result" && (
                    <div
                        className="rounded-xl p-3 mb-2 flex items-center gap-2 animate-fade-in-up"
                        style={{
                            background: "rgba(16,185,129,.08)",
                            border: "1px solid rgba(16,185,129,.2)",
                        }}
                    >
                        <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }}
                        />
                        <p className="text-sm font-semibold" style={{ color: "#047857" }}>
                            Analysis complete — results generated in 2.8s using ResNet-50 v2.1.0
                        </p>
                    </div>
                )}
            </div>

            {/* ── Results ── */}
            {state === "result" && <ResultCard result={MOCK_RESULT} />}
        </div>
    );
}
