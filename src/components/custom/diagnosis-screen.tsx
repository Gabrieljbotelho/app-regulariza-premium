"use client";

import { useState } from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { PremiumCard } from './premium-card';

export default function DiagnosisScreen() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  if (analyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-3xl flex items-center justify-center animate-pulse">
              <Sparkles className="w-12 h-12 text-[#0D0D0D]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-[#00FF7F]/30 border-t-[#00FF7F] rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Analisando seu imóvel...
            </h2>
            <p className="text-gray-400">
              Nossa IA está processando todas as informações
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen px-6 py-8 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Diagnóstico Completo
            </h1>
            <p className="text-gray-400">
              Análise inteligente do seu imóvel
            </p>
          </div>

          {/* Score Card */}
          <PremiumCard glow className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF7F] rounded-full">
                <span className="text-3xl font-bold text-[#0D0D0D]">7.5</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Situação Moderada</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Seu imóvel precisa de regularização, mas o processo é viável
                </p>
              </div>
            </div>
          </PremiumCard>

          {/* Issues Found */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Problemas identificados
            </h2>
            
            <PremiumCard hover={false} className="border-orange-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Área construída irregular</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Construção não consta na matrícula do imóvel
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                    Prioridade: Alta
                  </div>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard hover={false} className="border-yellow-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Documentação desatualizada</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Certidão de matrícula com mais de 90 dias
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                    Prioridade: Média
                  </div>
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Recomendações
            </h2>
            
            <div className="space-y-2">
              {[
                'Contratar topógrafo para levantamento da área',
                'Solicitar nova certidão de matrícula atualizada',
                'Consultar advogado especializado em regularização',
                'Reunir documentos de posse do imóvel',
              ].map((rec, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#00FF7F] flex-shrink-0" />
                  <p className="text-sm text-white">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Estimate */}
          <PremiumCard>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#00FF7F]/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-[#00FF7F]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Prazo estimado</p>
                <p className="text-2xl font-bold text-white">60-90 dias</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Custo estimado</p>
                <p className="text-2xl font-bold text-[#00FF7F]">R$ 8.500</p>
              </div>
            </div>
          </PremiumCard>

          {/* CTA */}
          <button className="w-full bg-[#00FF7F] text-[#0D0D0D] font-semibold py-4 px-8 rounded-xl hover:bg-[#00CC66] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,127,0.2)]">
            Iniciar processo de regularização
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Diagnóstico Inteligente
          </h1>
          <p className="text-gray-400">
            Análise completa com inteligência artificial
          </p>
        </div>

        {/* Hero Card */}
        <PremiumCard glow className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
          <div className="text-center space-y-4 py-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-3xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-[#0D0D0D]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Análise com IA
              </h3>
              <p className="text-gray-400 mt-2">
                Nossa inteligência artificial vai analisar todos os dados do seu imóvel e gerar um diagnóstico completo
              </p>
            </div>
          </div>
        </PremiumCard>

        {/* Features */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            O que será analisado
          </h2>
          
          <div className="space-y-2">
            {[
              { title: 'Situação legal', desc: 'Verificação de pendências e irregularidades' },
              { title: 'Documentação', desc: 'Análise de documentos necessários' },
              { title: 'Viabilidade', desc: 'Avaliação de custos e prazos' },
              { title: 'Recomendações', desc: 'Próximos passos personalizados' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"
              >
                <div className="w-2 h-2 bg-[#00FF7F] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#00FF7F] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <p className="text-white font-medium mb-1">Análise gratuita</p>
            <p>O diagnóstico é 100% gratuito e leva apenas alguns segundos para ser gerado.</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-[#00FF7F] text-[#0D0D0D] font-semibold py-4 px-8 rounded-xl hover:bg-[#00CC66] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,255,127,0.3)] hover:shadow-[0_0_40px_rgba(0,255,127,0.5)] hover:scale-105"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <Sparkles className="w-5 h-5" />
          Iniciar diagnóstico
        </button>
      </div>
    </div>
  );
}
