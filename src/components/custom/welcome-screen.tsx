"use client";

import { ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-20">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(0,255,127,0.3)]">
              <Sparkles className="w-12 h-12 text-[#0D0D0D]" />
            </div>
            <div className="absolute -inset-2 bg-[#00FF7F] opacity-20 blur-2xl rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Regulariza
          </h1>
          <p className="text-xl text-gray-400">
            Destravar seu imóvel nunca foi tão fácil
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 pt-8">
          {[
            'Diagnóstico inteligente com IA',
            'Acompanhamento em tempo real',
            'Rede de profissionais certificados',
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"
            >
              <div className="w-2 h-2 bg-[#00FF7F] rounded-full"></div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="w-full bg-[#00FF7F] text-[#0D0D0D] font-semibold py-4 px-8 rounded-xl hover:bg-[#00CC66] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,255,127,0.3)] hover:shadow-[0_0_40px_rgba(0,255,127,0.5)] hover:scale-105"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Vamos destravar seu imóvel?
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-sm text-gray-500 pt-4">
          Processo 100% digital e seguro
        </p>
      </div>
    </div>
  );
}
