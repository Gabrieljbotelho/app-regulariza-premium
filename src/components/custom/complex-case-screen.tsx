"use client";

import { useState } from 'react';
import { ArrowLeft, Send, Users, AlertTriangle, Home, FileText } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen } from '@/lib/types';

interface ComplexCaseScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export default function ComplexCaseScreen({ onNavigate }: ComplexCaseScreenProps) {
  const [selectedSituations, setSelectedSituations] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const situations = [
    { id: 'falecimento', label: 'Falecimento / sucessão', icon: Users },
    { id: 'litigio', label: 'Litígio / ação judicial', icon: AlertTriangle },
    { id: 'imovel_irregular', label: 'Imóvel irregular', icon: Home },
    { id: 'orientacao', label: 'Orientação jurídica / contratual', icon: FileText }
  ];

  const handleSituationToggle = (situationId: string) => {
    setSelectedSituations(prev =>
      prev.includes(situationId)
        ? prev.filter(id => id !== situationId)
        : [...prev, situationId]
    );
  };

  const handleSubmit = () => {
    if (selectedSituations.length === 0) {
      alert('Por favor, selecione pelo menos uma situação.');
      return;
    }
    if (!description.trim()) {
      alert('Por favor, descreva brevemente seu caso.');
      return;
    }

    // Aqui seria enviado para conectar com profissionais
    // Por enquanto, vamos para o marketplace
    onNavigate('marketplace', {
      type: 'complex',
      situations: selectedSituations,
      description,
      budget: budget ? parseFloat(budget) : undefined
    });
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Seu caso parece complexo
          </h1>
          <p className="text-gray-400">
            Podemos conectar você com um advogado ou especialista qualificado
          </p>
        </div>

        {/* Situations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Qual situação descreve seu caso?</h2>
          <div className="space-y-3">
            {situations.map((situation) => {
              const Icon = situation.icon;
              const isSelected = selectedSituations.includes(situation.id);
              return (
                <PremiumCard
                  key={situation.id}
                  onClick={() => handleSituationToggle(situation.id)}
                  className={`cursor-pointer ${isSelected ? 'ring-2 ring-[#00FF7F]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#00FF7F]' : 'bg-[#2A2A2A]'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-[#0D0D0D]' : 'text-[#00FF7F]'}`} />
                    </div>
                    <span className={`text-lg ${isSelected ? 'text-[#00FF7F]' : 'text-white'}`}>
                      {situation.label}
                    </span>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <PremiumCard>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Descreva brevemente seu caso
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F] resize-none"
              placeholder="Conte-nos mais detalhes sobre sua situação..."
              rows={4}
            />
          </div>
        </PremiumCard>

        {/* Budget */}
        <PremiumCard>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Orçamento aproximado (opcional)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F]"
              placeholder="Ex: 2000.00"
            />
          </div>
        </PremiumCard>

        {/* Info */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
          <p className="text-sm text-gray-400">
            💡 <strong>Como funciona:</strong> Entraremos em contato com profissionais parceiros
            especializados na sua área. Eles avaliarão seu caso e entrarão em contato diretamente.
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#00FF7F] hover:bg-[#00CC66] text-[#0D0D0D] font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Conectar com profissionais
        </button>

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