import Image from "next/image";

interface ScanningAnimationProps {
    imageUrl: string;
}

export default function ScanningAnimation({ imageUrl }: ScanningAnimationProps) {
    return (
        <div
            className="relative rounded-2xl overflow-hidden animate-fade-in-up"
            style={{
                border: "2.5px solid #34d399",
                boxShadow: "0 0 0 4px rgba(52,211,153,.2), 0 8px 32px rgba(16,185,129,.25)",
            }}
        >
            {/* Leaf image */}
            <Image
                src={imageUrl}
                alt="Leaf being scanned"
                width={600}
                height={400}
                className="w-full object-cover"
                style={{ maxHeight: 340, filter: "brightness(0.88)" }}
            />

            {/* Pulsing ring overlay */}
            <div
                className="absolute inset-0 rounded-2xl animate-pulse-ring pointer-events-none"
                style={{ border: "3px solid rgba(52,211,153,.5)" }}
            />

            {/* Scanning beam */}
            <div
                className="absolute left-0 right-0 h-[3px] animate-scan-beam pointer-events-none"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(52,211,153,.9) 50%, transparent 100%)",
                    boxShadow: "0 0 12px 4px rgba(52,211,153,.5)",
                }}
            />

            {/* Scanning grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, #34d399 0px, #34d399 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #34d399 0px, #34d399 1px, transparent 1px, transparent 40px)",
                }}
            />

            {/* Status label */}
            <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-3"
                style={{
                    background: "linear-gradient(0deg, rgba(4,78,59,.85) 0%, transparent 100%)",
                    backdropFilter: "blur(4px)",
                }}
            >
                {/* Spinning ring */}
                <div
                    className="w-5 h-5 rounded-full border-2 animate-spin"
                    style={{ borderColor: "#34d399", borderTopColor: "transparent" }}
                />
                <span className="text-white text-[14px] font-semibold tracking-wide">
                    Analysing leaf
                    <span className="animate-dot-1">.</span>
                    <span className="animate-dot-2">.</span>
                    <span className="animate-dot-3">.</span>
                </span>
                {/* Pulse dot */}
                <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#34d399", boxShadow: "0 0 8px #34d399" }}
                />
            </div>

            {/* Corner brackets */}
            {[
                { top: 12, left: 12, borderTop: "3px solid #34d399", borderLeft: "3px solid #34d399" },
                { top: 12, right: 12, borderTop: "3px solid #34d399", borderRight: "3px solid #34d399" },
                { bottom: 12, left: 12, borderBottom: "3px solid #34d399", borderLeft: "3px solid #34d399" },
                { bottom: 12, right: 12, borderBottom: "3px solid #34d399", borderRight: "3px solid #34d399" },
            ].map((s, i) => (
                <div
                    key={i}
                    className="absolute w-6 h-6 pointer-events-none"
                    style={{ ...s }}
                />
            ))}
        </div>
    );
}
