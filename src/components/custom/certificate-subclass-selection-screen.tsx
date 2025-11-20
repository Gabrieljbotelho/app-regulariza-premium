"use client";

import { ArrowLeft, Clock, DollarSign } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, CertificateSubclass, CERTIFICATE_SUBCLASSES } from '@/lib/types';

interface CertificateSubclassSelectionScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  classId: string;
}

export default function CertificateSubclassSelectionScreen({ onNavigate, classId }: CertificateSubclassSelectionScreenProps) {
  const subclasses = CERTIFICATE_SUBCLASSES[classId] || [];

  const handleSubclassSelect = (subclass: CertificateSubclass) => {
    onNavigate('certificate-form', { subclassId: subclass.id });
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Selecione o tipo de certidão
          </h1>
          <p className="text-gray-400">
            Escolha a certidão específica que você precisa
          </p>
        </div>

        {/* Subclasses List */}
        <div className="space-y-4">
          {subclasses.map((subclass) => (
            <PremiumCard
              key={subclass.id}
              onClick={() => handleSubclassSelect(subclass)}
              className="cursor-pointer"
            >
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{subclass.name}</h3>
                  <p className="text-sm text-gray-400">{subclass.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{subclass.processing_time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00FF7F]">
                    <DollarSign className="w-4 h-4" />
                    <span>R$ {subclass.estimated_cost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Campos necessários: {subclass.required_fields.join(', ')}
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('certificate-class')}
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