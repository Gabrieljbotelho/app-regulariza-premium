"use client";

import { FileText, Gavel, AlertTriangle, HelpCircle } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, NeedType } from '@/lib/types';

interface NeedSelectionScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export default function NeedSelectionScreen({ onNavigate }: NeedSelectionScreenProps) {
  const handleNeedSelect = (need: NeedType) => {
    switch (need) {
      case 'certificate':
        onNavigate('certificate-class');
        break;
      case 'act':
        onNavigate('act-selection');
        break;
      case 'complex':
        onNavigate('complex-case');
        break;
      case 'other':
        onNavigate('ai-assistant');
        break;
    }
  };

  const needs = [
    {
      type: 'certificate' as NeedType,
      title: 'Solicitar uma certidão',
      description: 'Certidões de registro de imóveis, civil, notas ou pesquisas',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'act' as NeedType,
      title: 'Fazer um registro/ato',
      description: 'Compra/venda, doação, união estável, hipoteca, etc.',
      icon: Gavel,
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'complex' as NeedType,
      title: 'Regularização ou processo complexo',
      description: 'Inventário, partilha, divórcio, imóvel irregular',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    },
    {
      type: 'other' as NeedType,
      title: 'Outra necessidade',
      description: 'Orientação geral ou dúvida específica',
      icon: HelpCircle,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Como podemos ajudar?
          </h1>
          <p className="text-gray-400">
            Selecione o que você precisa para regularizar seu imóvel
          </p>
        </div>

        {/* Needs Grid */}
        <div className="space-y-4">
          {needs.map((need) => {
            const Icon = need.icon;
            return (
              <PremiumCard
                key={need.type}
                onClick={() => handleNeedSelect(need.type)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${need.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{need.title}</h3>
                    <p className="text-sm text-gray-400">{need.description}</p>
                  </div>
                </div>
              </PremiumCard>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
          <p className="text-sm text-gray-400 text-center">
            💡 <strong>Dica:</strong> Selecione a opção mais próxima do seu objetivo.
            Você pode alterar ou refinar sua escolha posteriormente.
          </p>
        </div>
      </div>
    </div>
  );
}