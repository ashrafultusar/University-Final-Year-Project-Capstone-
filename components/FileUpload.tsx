"use client";

import { useRef, useState, useCallback, DragEvent, ChangeEvent } from "react";
import { UploadCloud, Camera, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    onFile: (file: File) => void;
    onClear: () => void;
    previewUrl: string | null;
    disabled?: boolean;
}

export default function FileUpload({ onFile, onClear, previewUrl, disabled }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validate = (file: File): boolean => {
        if (!file.type.startsWith("image/")) {
            setError("Please upload a valid image file (JPG, PNG, WebP).");
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError("File size must be under 10 MB.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleFile = useCallback(
        (file: File) => {
            if (validate(file)) onFile(file);
        },
        [onFile]
    );

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const openCamera = () => {
        if (inputRef.current) {
            inputRef.current.capture = "environment";
            inputRef.current.accept = "image/*";
            inputRef.current.click();
        }
    };

    /* ── Preview state ── */
    if (previewUrl) {
        return (
            <div className="relative rounded-2xl overflow-hidden animate-fade-in-up" style={{ border: "2px solid var(--emerald-300)" }}>
                <Image
                    src={previewUrl}
                    alt="Uploaded leaf"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    style={{ maxHeight: 340 }}
                />
                {!disabled && (
                    <button
                        onClick={onClear}
                        className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-110"
                        style={{
                            background: "rgba(0,0,0,.55)",
                            border: "1.5px solid rgba(255,255,255,.3)",
                            color: "#fff",
                        }}
                        aria-label="Remove image"
                    >
                        <X size={16} />
                    </button>
                )}
                <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center gap-2"
                    style={{ background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)" }}
                >
                    <ImageIcon size={14} color="#6ee7b7" />
                    <span className="text-white text-xs font-medium">Leaf image loaded — ready to analyse</span>
                </div>
            </div>
        );
    }

    /* ── Drop zone ── */
    return (
        <div className="flex flex-col gap-4">
            {/* Drop zone */}
            <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={() => setDragging(false)}
                onClick={() => inputRef.current?.click()}
                className="relative flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer transition-all duration-200 select-none"
                style={{
                    minHeight: 260,
                    border: `2.5px dashed ${dragging ? "#10b981" : "#6ee7b7"}`,
                    background: dragging
                        ? "rgba(16,185,129,.06)"
                        : "linear-gradient(135deg, rgba(236,253,245,.8) 0%, rgba(255,255,255,.9) 100%)",
                    transform: dragging ? "scale(1.01)" : "scale(1)",
                    boxShadow: dragging ? "0 0 0 4px rgba(16,185,129,.15)" : "none",
                }}
                role="button"
                tabIndex={0}
                aria-label="Drop zone — click or drag an image here"
                onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            >
                {/* Animated upload icon */}
                <div
                    className="flex items-center justify-center rounded-full w-20 h-20"
                    style={{
                        background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                        boxShadow: "0 4px 16px rgba(16,185,129,.25)",
                    }}
                >
                    <UploadCloud size={36} color="#059669" strokeWidth={1.8} />
                </div>

                <div className="text-center px-4">
                    <p className="font-bold text-[16px]" style={{ color: "var(--text-primary)" }}>
                        Drag &amp; drop your leaf image here
                    </p>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                        or click to browse — JPG, PNG, WebP up to 10 MB
                    </p>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={onInputChange}
                    tabIndex={-1}
                />
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-600 font-medium flex items-center gap-1.5">
                    <span>⚠</span> {error}
                </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>or</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            {/* Camera button */}
            <button
                onClick={openCamera}
                className="flex items-center justify-center gap-3 w-full rounded-2xl py-4 font-semibold text-[15px] transition-all duration-200 hover:scale-[1.02] active:scale-[.98]"
                style={{
                    background: "linear-gradient(135deg, #059669, #047857)",
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(5,150,105,.35)",
                    border: "none",
                }}
            >
                <Camera size={22} strokeWidth={1.8} />
                Open Camera
            </button>
        </div>
    );
}
