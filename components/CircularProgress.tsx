"use client";

import { useEffect, useRef } from "react";

interface CircularProgressProps {
    value: number;       // 0 – 100
    size?: number;       // px, default 120
    stroke?: number;     // stroke width, default 10
    color?: string;
    trackColor?: string;
    label?: string;
    sublabel?: string;
    animate?: boolean;
}

export default function CircularProgress({
    value,
    size = 120,
    stroke = 10,
    color = "#10b981",
    trackColor = "#d1fae5",
    label,
    sublabel,
    animate = true,
}: CircularProgressProps) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;

    const circleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        if (!circleRef.current || !animate) return;
        // Start from full offset (empty), animate to target
        circleRef.current.style.strokeDashoffset = String(circ);
        const frame = requestAnimationFrame(() => {
            if (circleRef.current) {
                circleRef.current.style.transition = "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)";
                circleRef.current.style.strokeDashoffset = String(offset);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [value, offset, circ, animate]);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
                aria-label={`${value}% confidence`}
            >
                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={stroke}
                />
                {/* Progress */}
                <circle
                    ref={circleRef}
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={animate ? circ : offset}
                    style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
                />
            </svg>
            {/* Center label */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                style={{ transform: "rotate(0deg)" }}
            >
                <span
                    className="font-extrabold leading-none"
                    style={{ fontSize: size * 0.22, color }}
                >
                    {value}%
                </span>
                {label && (
                    <span
                        className="font-semibold mt-0.5"
                        style={{ fontSize: size * 0.1, color: "var(--text-secondary)" }}
                    >
                        {label}
                    </span>
                )}
                {sublabel && (
                    <span
                        style={{ fontSize: size * 0.085, color: "var(--text-muted)" }}
                    >
                        {sublabel}
                    </span>
                )}
            </div>
        </div>
    );
}
