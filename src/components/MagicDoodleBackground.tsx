import React, { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const MagicDoodleBackground: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    let rafId = 0;
    let lastSparkleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 24;
      const ny = (e.clientY / window.innerHeight - 0.5) * 24;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMouseOffset({ x: nx, y: ny });
      });

      const now = performance.now();
      if (now - lastSparkleTime > 90) {
        lastSparkleTime = now;
        const colors = ['#FBBF24', '#38BDF8', '#F472B6', '#4ADE80', '#A78BFA'];
        const newSparkle: SparkleParticle = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 10 + Math.floor(Math.random() * 10),
        };
        setSparkles((prev) => [...prev.slice(-10), newSparkle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Ambient Radial Studio Stage Glows */}
      <div
        className="absolute -top-36 -left-36 w-[34rem] h-[34rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(15,23,42,0) 70%)',
          transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/4 -right-36 w-[36rem] h-[36rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(15,23,42,0) 70%)',
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[40rem] h-[40rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(15,23,42,0) 70%)',
          transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * -0.4}px, 0)`,
        }}
      />

      {/* Subtle Isometric Grid Mesh */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="magis-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#93C5FD" strokeWidth="1" />
            <circle cx="28" cy="28" r="1.5" fill="#FDE047" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#magis-grid)" />
      </svg>

      {/* Cute Moving Magic Doodle 1: Floating Cute AI Robot (Top Left) */}
      <div
        className="absolute top-20 left-[4%] animate-float-slow opacity-35 md:opacity-55"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
        }}
      >
        <svg width="86" height="86" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="14" r="5" fill="#FBBF24" />
          <path d="M50 19V28" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <rect x="22" y="28" width="56" height="44" rx="16" fill="#1E293B" stroke="#38BDF8" strokeWidth="3.5" />
          <rect x="30" y="36" width="40" height="24" rx="8" fill="#0F172A" />
          <circle cx="41" cy="48" r="5" fill="#38BDF8" />
          <circle cx="59" cy="48" r="5" fill="#38BDF8" />
          <path d="M44 55C46 57.5 54 57.5 56 55" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 46C18 44 20 46 22 50" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M86 46C82 44 80 46 78 50" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Cute Moving Magic Doodle 2: 3D Tennis Racket & Magic Ball (Top Right) */}
      <div
        className="absolute top-28 right-[5%] animate-float-reverse opacity-35 md:opacity-55"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.9}px, ${mouseOffset.y * 0.7}px, 0)`,
        }}
      >
        <svg width="96" height="96" viewBox="0 0 110 110" fill="none">
          <ellipse cx="46" cy="42" rx="24" ry="30" transform="rotate(-30 46 42)" fill="#0F172A" stroke="#A855F7" strokeWidth="4" />
          <path d="M32 28L60 56M26 38L54 66M38 20L66 48" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M62 67L82 95" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
          <circle cx="78" cy="34" r="11" fill="#A3E635" stroke="#FEF08A" strokeWidth="2.5" />
          <path d="M71 29C75 33 75 39 71 42" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Cute Moving Magic Doodle 3: Question Mystery Block & Star (Bottom Left) */}
      <div
        className="absolute bottom-24 left-[3%] animate-float-reverse opacity-40 md:opacity-65"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.7}px, ${mouseOffset.y * -0.7}px, 0)`,
        }}
      >
        <svg width="82" height="82" viewBox="0 0 90 90" fill="none">
          <rect x="16" y="18" width="52" height="52" rx="10" fill="#F59E0B" stroke="#FEF08A" strokeWidth="3.5" />
          <circle cx="23" cy="25" r="2.5" fill="#78350F" />
          <circle cx="61" cy="25" r="2.5" fill="#78350F" />
          <circle cx="23" cy="63" r="2.5" fill="#78350F" />
          <circle cx="61" cy="63" r="2.5" fill="#78350F" />
          <path
            d="M36 36C36 31.5 40 29 44 29C48.5 29 51 32 51 35.5C51 39 47 40.5 44.5 43C43.5 44 43.5 46 43.5 48"
            stroke="#FFFBEB"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="43.5" cy="56" r="3" fill="#FFFBEB" />
        </svg>
      </div>

      {/* Cute Moving Magic Doodle 4: Handheld Console & Magic Wand (Bottom Right) */}
      <div
        className="absolute bottom-28 right-[4%] animate-float-slow opacity-35 md:opacity-55"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.7}px, ${mouseOffset.y * -0.5}px, 0)`,
        }}
      >
        <svg width="104" height="72" viewBox="0 0 120 80" fill="none">
          <rect x="12" y="18" width="96" height="44" rx="18" fill="#1E293B" stroke="#F43F5E" strokeWidth="3" />
          <rect x="34" y="23" width="52" height="34" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="23" cy="34" r="3.5" fill="#38BDF8" />
          <path d="M20 46H26M23 43V49" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="97" cy="33" r="3" fill="#FBBF24" />
          <circle cx="97" cy="45" r="3" fill="#4ADE80" />
          <text x="45" y="44" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            MAGIS AI
          </text>
        </svg>
      </div>

      {/* Cute Moving Magic Doodle 5: Floating DSKP Book & Sparkle Stars (Center-Left & Center-Right) */}
      <div className="absolute top-[52%] left-[18%] animate-magic-sparkle opacity-35">
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 4L28.5 18.5L43 24L28.5 29.5L24 44L19.5 29.5L5 24L19.5 18.5L24 4Z"
            fill="#FDE047"
            fillOpacity="0.45"
            stroke="#FDE047"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="absolute top-[16%] left-[46%] animate-magic-sparkle opacity-30">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 4L28.5 18.5L43 24L28.5 29.5L24 44L19.5 29.5L5 24L19.5 18.5L24 4Z"
            fill="#38BDF8"
            fillOpacity="0.4"
            stroke="#38BDF8"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Interactive Cursor Magic Sparkle Trail */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="fixed pointer-events-none transition-opacity duration-500"
          style={{
            left: sp.x - sp.size / 2,
            top: sp.y - sp.size / 2,
            width: sp.size,
            height: sp.size,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full animate-ping">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill={sp.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
