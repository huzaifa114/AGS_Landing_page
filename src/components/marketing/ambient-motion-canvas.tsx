"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export interface AmbientMotionCanvasProps {
  className?: string;
}

function AmbientMotionCanvas({ className }: AmbientMotionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    const canvas = canvasEl;
    const ctx = context;

    let frame = 0;
    let raf = 0;
    let particles: Particle[] = [];
    let scanY = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const isDark = () => document.documentElement.classList.contains("dark");

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 14000);
      particles = Array.from({ length: Math.max(24, Math.min(count, 70)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.45 + 0.15,
      }));
    }

    function drawGrid(dark: boolean) {
      const step = 48;
      ctx.strokeStyle = dark ? "rgba(56, 189, 248, 0.06)" : "rgba(99, 102, 241, 0.07)";
      ctx.lineWidth = 1;
      const offset = (frame * 0.15) % step;

      for (let x = -step + offset; x < width + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -step + offset * 0.6; y < height + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function drawStreaks(dark: boolean) {
      const streakCount = 3;
      for (let i = 0; i < streakCount; i++) {
        const t = frame * 0.004 + i * 1.7;
        const y = ((Math.sin(t) * 0.5 + 0.5) * 0.6 + 0.15) * height;
        const grad = ctx.createLinearGradient(0, y, width, y);
        if (dark) {
          grad.addColorStop(0, "rgba(56, 189, 248, 0)");
          grad.addColorStop(0.45, "rgba(56, 189, 248, 0.12)");
          grad.addColorStop(0.55, "rgba(139, 92, 246, 0.1)");
          grad.addColorStop(1, "rgba(139, 92, 246, 0)");
        } else {
          grad.addColorStop(0, "rgba(99, 102, 241, 0)");
          grad.addColorStop(0.5, "rgba(99, 102, 241, 0.08)");
          grad.addColorStop(1, "rgba(124, 58, 237, 0)");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, y - 28, width, 56);
      }
    }

    function drawParticles(dark: boolean) {
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(56, 189, 248, ${p.a * 0.9})`
          : `rgba(99, 102, 241, ${p.a * 0.75})`;
        ctx.fill();
      }
    }

    function drawScanLine(dark: boolean) {
      if (reduceMotion) return;
      scanY = (scanY + 0.55) % (height + 40);
      const y = scanY - 20;
      const grad = ctx.createLinearGradient(0, y - 1, 0, y + 1);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, dark ? "rgba(56, 189, 248, 0.35)" : "rgba(99, 102, 241, 0.28)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, y - 1, width, 2);
    }

    function paint() {
      const dark = isDark();
      ctx.clearRect(0, 0, width, height);

      drawGrid(dark);
      drawStreaks(dark);
      drawParticles(dark);
      drawScanLine(dark);

      frame += 1;
      if (!reduceMotion) raf = requestAnimationFrame(paint);
    }

    resize();
    paint();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onTheme = () => {
      if (reduceMotion) paint();
    };
    const observer = new MutationObserver(onTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full opacity-80 dark:opacity-90", className)}
      aria-hidden="true"
    />
  );
}

export { AmbientMotionCanvas };
