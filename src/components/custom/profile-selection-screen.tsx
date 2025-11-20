"use client";

import { useState } from 'react';
import { User, Scale, Home, HardHat, ArrowRight } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { UserProfile } from '@/lib/types';

interface ProfileSelectionScreenProps {
  onProfileSelected: (profile: UserProfile) => void;
}

const profiles = [
  {
    type: 'comum' as UserProfile,
    icon: User,
    title: 'Usuário Comum',
    description: 'Sou proprietário e preciso regularizar meu imóvel',
    color: 'from-blue-500 to-blue-600'
  },
  {
    type: 'advogado' as UserProfile,
    icon: Scale,
    title: 'Advogado',
    description: 'Sou advogado e preciso de ferramentas jurídicas',
    color: 'from-purple-500 to-purple-600'
  },
  {
    type: 'corretor' as UserProfile,
    icon: Home,
    title: 'Corretor de Imóveis',
    description: 'Trabalho com vendas e preciso analisar imóveis',
    color: 'from-orange-500 to-orange-600'
  },
  {
    type: 'engenheiro' as UserProfile,
    icon: HardHat,
    title: 'Engenheiro/Arquiteto',
    description: 'Sou profissional técnico e preciso de ferramentas especializadas',
    color: 'from-green-500 to-green-600'
  }
];

export default function ProfileSelectionScreen({ onProfileSelected }: ProfileSelectionScreenProps) {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);

  const handleConfirm = () => {
    if (selectedProfile) {
      onProfileSelected(selectedProfile);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Qual é o seu perfil?
          </h1>
          <p className="text-gray-400">
            Selecione sua profissão para liberar ferramentas específicas
          </p>
        </div>

        {/* Profile Cards */}
        <div className="space-y-4">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedProfile === profile.type;
            
            return (
              <PremiumCard
                key={profile.type}
                onClick={() => setSelectedProfile(profile.type)}
                className={`transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-[#00FF7F] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]' 
                    : 'hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${profile.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {profile.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {profile.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-[#00FF7F] rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-[#0D0D0D] rounded-full"></div>
                    </div>
                  )}
                </div>
              </PremiumCard>
            );
          })}
        </div>

        {/* Confirm Button */}
        {selectedProfile && (
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {/* Info Box */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-sm text-gray-400 text-center">
            💡 Você poderá alterar seu perfil depois nas configurações
          </p>
        </div>
      </div>
    </div>
  );
}
