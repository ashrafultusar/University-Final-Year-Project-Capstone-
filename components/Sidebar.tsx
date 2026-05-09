"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ScanLine,
    History,
    ShieldCheck,
    Info,
    Leaf,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/predict", label: "Smart Scan", icon: ScanLine },
    { href: "/history", label: "History", icon: History },
    { href: "/prevention", label: "Prevention Guide", icon: ShieldCheck },
    { href: "/about", label: "About", icon: Info },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 overflow-hidden transition-all duration-300"
            style={{
                width: collapsed ? "72px" : "260px",
                background: "linear-gradient(180deg, #064e3b 0%, #065f46 60%, #047857 100%)",
                boxShadow: "4px 0 24px rgba(6,78,59,.25)",
                zIndex: 40,
            }}
        >
            {/* Brand */}
            <div
                className="flex items-center gap-3 px-4 py-5 border-b"
                style={{ borderColor: "rgba(52,211,153,.2)" }}
            >
                <div
                    className="flex items-center justify-center rounded-xl shrink-0"
                    style={{
                        width: 40, height: 40,
                        background: "rgba(52,211,153,.18)",
                        border: "1.5px solid rgba(52,211,153,.4)",
                    }}
                >
                    <Leaf size={22} color="#6ee7b7" strokeWidth={2} />
                </div>
                {!collapsed && (
                    <div className="animate-fade-in-up">
                        <p className="text-white font-bold text-[15px] leading-tight">LeafScan AI</p>
                        <p style={{ color: "rgba(110,231,183,.7)", fontSize: 11 }}>Potato Disease System</p>
                    </div>
                )}
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 flex-1 px-2 py-4">
                {NAV_LINKS.map(({ href, label, icon: Icon }, idx) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            title={collapsed ? label : undefined}
                            className={`
                flex items-center gap-3 rounded-xl transition-all duration-200 select-none
                animate-fade-in-up delay-${(idx + 1) * 100}
                ${collapsed ? "justify-center px-0 py-3" : "px-4 py-3"}
                ${active
                                    ? "text-white font-semibold"
                                    : "text-emerald-200 hover:text-white"
                                }
              `}
                            style={{
                                background: active
                                    ? "rgba(52,211,153,.22)"
                                    : "transparent",
                                boxShadow: active ? "inset 0 0 0 1px rgba(52,211,153,.3)" : "none",
                            }}
                        >
                            <Icon
                                size={20}
                                strokeWidth={active ? 2.2 : 1.8}
                                color={active ? "#6ee7b7" : "currentColor"}
                                className="shrink-0"
                            />
                            {!collapsed && (
                                <span className="text-[14px]">{label}</span>
                            )}
                            {!collapsed && active && (
                                <div
                                    className="ml-auto w-1.5 h-1.5 rounded-full"
                                    style={{ background: "#34d399" }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* System Status Badge */}
            {!collapsed && (
                <div
                    className="mx-3 mb-3 rounded-xl p-3 animate-fade-in-up"
                    style={{
                        background: "rgba(52,211,153,.1)",
                        border: "1px solid rgba(52,211,153,.2)",
                    }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#34d399", boxShadow: "0 0 6px #34d399" }}
                        />
                        <span className="text-emerald-300 text-[12px] font-semibold">Model Online</span>
                    </div>
                    <p className="text-emerald-400 text-[11px]">v2.1.0 • ResNet-50 backbone</p>
                    <p className="text-emerald-400 text-[11px]">Accuracy: 97.8%</p>
                </div>
            )}

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center py-3 transition-colors duration-200 hover:bg-emerald-800/40 border-t"
                style={{ borderColor: "rgba(52,211,153,.15)", color: "#6ee7b7" }}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
        </aside>
    );
}
