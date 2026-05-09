"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Leaf,
    LayoutDashboard,
    ScanLine,
    History,
    ShieldCheck,
    Info,
    X,
    Menu,
} from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/predict", label: "Smart Scan", icon: ScanLine },
    { href: "/history", label: "History", icon: History },
    { href: "/prevention", label: "Prevention Guide", icon: ShieldCheck },
    { href: "/about", label: "About", icon: Info },
];

export default function MobileNavbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Top Bar */}
            <header
                className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
                style={{
                    height: "var(--navbar-h)",
                    background: "linear-gradient(90deg, #064e3b, #047857)",
                    boxShadow: "0 2px 16px rgba(6,78,59,.3)",
                }}
            >
                <div className="flex items-center gap-2.5">
                    <div
                        className="flex items-center justify-center rounded-lg"
                        style={{
                            width: 34, height: 34,
                            background: "rgba(52,211,153,.2)",
                            border: "1px solid rgba(52,211,153,.4)",
                        }}
                    >
                        <Leaf size={18} color="#6ee7b7" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-[14px] leading-tight">LeafScan AI</p>
                        <p className="text-emerald-300 text-[10px]">Potato Disease System</p>
                    </div>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center rounded-lg p-2 transition-colors"
                    style={{
                        background: "rgba(52,211,153,.15)",
                        border: "1px solid rgba(52,211,153,.3)",
                        color: "#6ee7b7",
                    }}
                    aria-label="Toggle navigation"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile Drawer Overlay */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 z-40"
                    style={{ background: "rgba(0,0,0,.45)" }}
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className="md:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-transform duration-300"
                style={{
                    width: 260,
                    transform: open ? "translateX(0)" : "translateX(-100%)",
                    background: "linear-gradient(180deg, #064e3b 0%, #065f46 60%, #047857 100%)",
                    boxShadow: "4px 0 24px rgba(6,78,59,.3)",
                }}
            >
                {/* Drawer brand */}
                <div
                    className="flex items-center gap-3 px-4 py-5 border-b"
                    style={{ borderColor: "rgba(52,211,153,.2)" }}
                >
                    <div
                        className="flex items-center justify-center rounded-xl"
                        style={{
                            width: 40, height: 40,
                            background: "rgba(52,211,153,.18)",
                            border: "1.5px solid rgba(52,211,153,.4)",
                        }}
                    >
                        <Leaf size={22} color="#6ee7b7" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-[15px]">LeafScan AI</p>
                        <p className="text-emerald-300 text-[11px]">Potato Disease System</p>
                    </div>
                </div>

                {/* Drawer Nav */}
                <nav className="flex flex-col gap-1 flex-1 px-2 py-4">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                                style={{
                                    background: active ? "rgba(52,211,153,.22)" : "transparent",
                                    boxShadow: active ? "inset 0 0 0 1px rgba(52,211,153,.3)" : "none",
                                    color: active ? "#fff" : "#a7f3d0",
                                    fontWeight: active ? 600 : 400,
                                }}
                            >
                                <Icon
                                    size={20}
                                    color={active ? "#6ee7b7" : "currentColor"}
                                    strokeWidth={active ? 2.2 : 1.8}
                                />
                                <span className="text-[14px]">{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Status */}
                <div
                    className="mx-3 mb-4 rounded-xl p-3"
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
                    <p className="text-emerald-400 text-[11px]">v2.1.0 • Accuracy: 97.8%</p>
                </div>
            </div>
        </>
    );
}
