"use client";

import { ArrowLeft, FileText, Heart, UserCheck, Shield, Home, Scale } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, CertificateSubclass, CERTIFICATE_SUBCLASSES } from '@/lib/types';

interface ActSelectionScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export default function ActSelectionScreen({ onNavigate }: ActSelectionScreenProps) {
  const acts = CERTIFICATE_SUBCLASSES['C'] || [];

  const handleActSelect = (act: CertificateSubclass) => {
    onNavigate('act-form', { subclassId: act.id });
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'C1': return Home;
      case 'C2': return Heart;
      case 'C3': return UserCheck;
      default: return FileText;
    }
  };

  const getColor = (id: string) => {
    switch (id) {
      case 'C1': return 'from-blue-500 to-blue-600';
      case 'C2': return 'from-red-500 to-red-600';
      case 'C3': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Qual ato deseja praticar?
          </h1>
          <p className="text-gray-400">
            Selecione o tipo de ato notarial que você precisa
          </p>
        </div>

        {/* Acts List */}
        <div className="space-y-4">
          {acts.map((act) => {
            const Icon = getIcon(act.id);
            const color = getColor(act.id);
            return (
              <PremiumCard
                key={act.id}
                onClick={() => handleActSelect(act)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{act.name}</h3>
                    <p className="text-sm text-gray-400">{act.description}</p>
                  </div>
                </div>
              </PremiumCard>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
          <p className="text-sm text-gray-400">
            💡 <strong>Importante:</strong> Para atos complexos como inventário ou partilha,
            recomendamos consultar um profissional especializado.
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('need-selection')}
            className="flex items-center gap-2 text-[#00FF7F] hover:text-[#00CC66] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}