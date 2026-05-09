import { ScanLine, Activity, ShieldCheck, AlertCircle, Clock, ArrowRight, TrendingUp, Leaf } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/StatCard";

const RECENT_SCANS = [
  { id: "1", disease: "Late Blight", confidence: 94, severity: "severe", date: "Today, 09:42 AM", color: "#ef4444" },
  { id: "2", disease: "Early Blight", confidence: 87, severity: "moderate", date: "Today, 08:15 AM", color: "#f97316" },
  { id: "3", disease: "Healthy Leaf", confidence: 99, severity: "healthy", date: "Yesterday, 04:20 PM", color: "#10b981" },
  { id: "4", disease: "Bacterial Wilt", confidence: 78, severity: "moderate", date: "Yesterday, 11:00 AM", color: "#f97316" },
  { id: "5", disease: "Leaf Roll Virus", confidence: 82, severity: "mild", date: "May 7, 2026", color: "#f59e0b" },
];

export default function DashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Leaf size={18} color="#10b981" />
            <span className="text-sm font-semibold" style={{ color: "#10b981" }}>
              LeafScan AI Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            {greeting}, Farmer 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{dateStr}</p>
        </div>
        <Link
          href="/predict"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-[1.03] active:scale-[.97] shrink-0"
          style={{
            background: "linear-gradient(135deg, #059669, #047857)",
            boxShadow: "0 6px 20px rgba(5,150,105,.35)",
          }}
        >
          <ScanLine size={18} />
          New Smart Scan
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Activity size={20} />}
          label="Total Scans"
          value="1,284"
          sub="All time"
          trend="up"
          trendLabel="12% this week"
          accentColor="#10b981"
          delay="0ms"
        />
        <StatCard
          icon={<AlertCircle size={20} />}
          label="Diseases Detected"
          value="347"
          sub="Across all scans"
          trend="down"
          trendLabel="5% this week"
          accentColor="#ef4444"
          delay="100ms"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Model Accuracy"
          value="97.8%"
          sub="ResNet-50 backbone"
          trend="up"
          trendLabel="v2.1.0 update"
          accentColor="#6366f1"
          delay="200ms"
        />
        <StatCard
          icon={<ShieldCheck size={20} />}
          label="Healthy Scans"
          value="937"
          sub="73% of all scans"
          trend="up"
          trendLabel="Good crop health"
          accentColor="#84cc16"
          delay="300ms"
        />
      </div>

      {/* ── Main grid: Quick Scan + Recent History ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quick Scan CTA card */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden flex flex-col animate-fade-in-up"
          style={{
            background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)",
            boxShadow: "0 12px 40px rgba(6,78,59,.3)",
          }}
        >
          {/* Decorative circles */}
          <div className="relative flex-1 p-6 overflow-hidden">
            <div
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
              style={{ background: "#6ee7b7" }}
            />
            <div
              className="absolute -bottom-12 -left-6 w-56 h-56 rounded-full opacity-10"
              style={{ background: "#34d399" }}
            />

            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 relative"
              style={{ background: "rgba(255,255,255,.15)", border: "2px solid rgba(255,255,255,.2)" }}
            >
              <ScanLine size={28} color="#fff" strokeWidth={1.8} />
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2">Smart Scan</h2>
            <p className="text-emerald-200 text-sm leading-relaxed mb-6">
              Upload or capture a potato leaf photo. Our AI model will diagnose diseases in seconds with a detailed treatment plan.
            </p>

            <Link
              href="/predict"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.04] active:scale-[.97]"
              style={{
                background: "rgba(255,255,255,.18)",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              Start Scanning
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mini stat strip */}
          <div
            className="px-6 py-4 flex items-center gap-6"
            style={{ background: "rgba(0,0,0,.2)", borderTop: "1px solid rgba(255,255,255,.1)" }}
          >
            <div className="text-center">
              <p className="text-white font-bold text-lg">~3s</p>
              <p className="text-emerald-300 text-[11px]">Avg. scan time</p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(255,255,255,.15)" }} />
            <div className="text-center">
              <p className="text-white font-bold text-lg">5</p>
              <p className="text-emerald-300 text-[11px]">Disease classes</p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(255,255,255,.15)" }} />
            <div className="text-center">
              <p className="text-white font-bold text-lg">97.8%</p>
              <p className="text-emerald-300 text-[11px]">Accuracy</p>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="lg:col-span-3 card p-0 overflow-hidden animate-fade-in-up delay-200">
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2">
              <Clock size={16} color="#10b981" />
              <h2 className="font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>
                Recent Scans
              </h2>
            </div>
            <Link
              href="/history"
              className="text-xs font-semibold flex items-center gap-1 hover:underline"
              style={{ color: "#10b981" }}
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {RECENT_SCANS.map((scan, i) => (
              <li
                key={scan.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-emerald-50/50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Color dot */}
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: scan.color, boxShadow: `0 0 6px ${scan.color}80` }}
                />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                    {scan.disease}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{scan.date}</p>
                </div>
                {/* Confidence */}
                <div
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: `${scan.color}15`,
                    color: scan.color,
                    border: `1px solid ${scan.color}30`,
                  }}
                >
                  {scan.confidence}% match
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Disease overview strip ── */}
      <div className="card p-5 animate-fade-in-up delay-400">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} color="#10b981" />
          <h2 className="font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>
            Disease Prevalence This Season
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { name: "Late Blight", pct: 38, color: "#ef4444" },
            { name: "Early Blight", pct: 27, color: "#f97316" },
            { name: "Leaf Roll Virus", pct: 15, color: "#f59e0b" },
            { name: "Bacterial Wilt", pct: 12, color: "#a855f7" },
            { name: "Healthy", pct: 8, color: "#10b981" },
          ].map((d) => (
            <div key={d.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium truncate" style={{ color: "var(--text-secondary)", maxWidth: "70%" }}>
                  {d.name}
                </span>
                <span className="text-xs font-bold" style={{ color: d.color }}>{d.pct}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: `${d.color}20` }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${d.pct}%`,
                    background: d.color,
                    boxShadow: `0 0 6px ${d.color}60`,
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
