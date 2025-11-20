"use client";

import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function PremiumCard({ children, className = '', hover = true, glow = false, onClick }: PremiumCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]
        ${hover ? 'hover:border-[#00FF7F] hover:shadow-[0_0_20px_rgba(0,255,127,0.15)] transition-all duration-300 hover:scale-[1.02] cursor-pointer' : ''}
        ${glow ? 'shadow-[0_0_30px_rgba(0,255,127,0.1)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
