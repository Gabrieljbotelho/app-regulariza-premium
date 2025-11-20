"use client";

import { Building, Users, FileSignature, Search } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, CertificateClass, CERTIFICATE_CLASSES } from '@/lib/types';

interface CertificateClassSelectionScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export default function CertificateClassSelectionScreen({ onNavigate }: CertificateClassSelectionScreenProps) {
  const handleClassSelect = (classItem: CertificateClass) => {
    onNavigate('certificate-subclass', { classId: classItem.id });
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'A': return Building;
      case 'B': return Users;
      case 'C': return FileSignature;
      case 'D': return Search;
      default: return FileSignature;
    }
  };

  const getColor = (id: string) => {
    switch (id) {
      case 'A': return 'from-blue-500 to-blue-600';
      case 'B': return 'from-green-500 to-green-600';
      case 'C': return 'from-purple-500 to-purple-600';
      case 'D': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Em qual área você precisa da certidão?
          </h1>
          <p className="text-gray-400">
            Selecione a categoria que melhor se encaixa
          </p>
        </div>

        {/* Classes Grid */}
        <div className="space-y-4">
          {CERTIFICATE_CLASSES.map((classItem) => {
            const Icon = getIcon(classItem.id);
            const color = getColor(classItem.id);
            return (
              <PremiumCard
                key={classItem.id}
                onClick={() => handleClassSelect(classItem)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{classItem.name}</h3>
                    <p className="text-sm text-gray-400">{classItem.description}</p>
                  </div>
                </div>
              </PremiumCard>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('need-selection')}
            className="text-[#00FF7F] hover:text-[#00CC66] transition-colors text-sm"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}