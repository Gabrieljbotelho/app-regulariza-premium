"use client";

import { useState } from 'react';
import { ArrowRight, Home, Building2, MapPin, Store, TreePine } from 'lucide-react';
import { PropertyType, ProblemType } from '@/lib/types';
import { PremiumCard } from './premium-card';

interface QuestionsScreenProps {
  onComplete: (data: { propertyType: PropertyType; problem: ProblemType }) => void;
}

export function QuestionsScreen({ onComplete }: QuestionsScreenProps) {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [problem, setProblem] = useState<ProblemType | null>(null);

  const propertyTypes = [
    { value: 'casa' as PropertyType, label: 'Casa', icon: Home },
    { value: 'apartamento' as PropertyType, label: 'Apartamento', icon: Building2 },
    { value: 'terreno' as PropertyType, label: 'Terreno', icon: MapPin },
    { value: 'comercial' as PropertyType, label: 'Comercial', icon: Store },
    { value: 'rural' as PropertyType, label: 'Rural', icon: TreePine },
  ];

  const problems = [
    { value: 'sem-escritura' as ProblemType, label: 'Sem escritura' },
    { value: 'area-irregular' as ProblemType, label: 'Área irregular' },
    { value: 'construcao-irregular' as ProblemType, label: 'Construção irregular' },
    { value: 'divida-iptu' as ProblemType, label: 'Dívida de IPTU' },
    { value: 'inventario' as ProblemType, label: 'Inventário' },
    { value: 'usucapiao' as ProblemType, label: 'Usucapião' },
    { value: 'outro' as ProblemType, label: 'Outro problema' },
  ];

  const handleNext = () => {
    if (step === 1 && propertyType) {
      setStep(2);
    } else if (step === 2 && problem) {
      onComplete({ propertyType: propertyType!, problem });
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Etapa {step} de 2</span>
            <span>{step === 1 ? '50%' : '100%'}</span>
          </div>
          <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] transition-all duration-500"
              style={{ width: `${step * 50}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {step === 1 ? 'Qual tipo de imóvel?' : 'Qual o problema atual?'}
          </h2>
          <p className="text-gray-400">
            {step === 1
              ? 'Selecione o tipo do seu imóvel'
              : 'Nos conte qual a situação do imóvel'}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {step === 1
            ? propertyTypes.map(({ value, label, icon: Icon }) => (
                <PremiumCard
                  key={value}
                  onClick={() => setPropertyType(value)}
                  className={`${
                    propertyType === value
                      ? 'border-[#00FF7F] bg-[#00FF7F]/5'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      propertyType === value ? 'bg-[#00FF7F]' : 'bg-[#2A2A2A]'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        propertyType === value ? 'text-[#0D0D0D]' : 'text-white'
                      }`} />
                    </div>
                    <span className="text-lg font-medium">{label}</span>
                  </div>
                </PremiumCard>
              ))
            : problems.map(({ value, label }) => (
                <PremiumCard
                  key={value}
                  onClick={() => setProblem(value)}
                  className={`${
                    problem === value
                      ? 'border-[#00FF7F] bg-[#00FF7F]/5'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      problem === value ? 'bg-[#00FF7F]' : 'bg-[#2A2A2A]'
                    }`}></div>
                    <span className="text-lg font-medium">{label}</span>
                  </div>
                </PremiumCard>
              ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={(step === 1 && !propertyType) || (step === 2 && !problem)}
          className="w-full bg-[#00FF7F] text-[#0D0D0D] font-semibold py-4 px-8 rounded-xl hover:bg-[#00CC66] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00FF7F] shadow-[0_0_20px_rgba(0,255,127,0.2)]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {step === 1 ? 'Continuar' : 'Finalizar'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
