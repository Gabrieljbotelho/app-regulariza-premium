"use client";

import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { PremiumCard } from './premium-card';

export function MarketplaceScreen() {
  const professionals = [
    {
      name: 'Dr. Carlos Silva',
      role: 'Advogado Imobiliário',
      rating: 4.9,
      reviews: 127,
      price: 3500,
      verified: true,
      location: 'São Paulo, SP',
    },
    {
      name: 'Eng. Ana Santos',
      role: 'Topógrafa',
      rating: 4.8,
      reviews: 89,
      price: 2800,
      verified: true,
      location: 'São Paulo, SP',
    },
    {
      name: 'Dr. Roberto Lima',
      role: 'Advogado Especialista',
      rating: 5.0,
      reviews: 203,
      price: 4200,
      verified: true,
      location: 'São Paulo, SP',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Especialistas
          </h1>
          <p className="text-gray-400">
            Profissionais certificados para seu processo
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Todos', 'Advogados', 'Topógrafos', 'Engenheiros', 'Arquitetos'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                filter === 'Todos'
                  ? 'bg-[#00FF7F] text-[#0D0D0D]'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Professionals List */}
        <div className="space-y-3">
          {professionals.map((pro, index) => (
            <PremiumCard key={index}>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#0D0D0D]">
                      {pro.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white truncate">{pro.name}</h3>
                      {pro.verified && (
                        <BadgeCheck className="w-5 h-5 text-[#00FF7F] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{pro.role}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#00FF7F] fill-[#00FF7F]" />
                        <span className="text-sm font-medium text-white">{pro.rating}</span>
                        <span className="text-xs text-gray-500">({pro.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{pro.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                  <div>
                    <p className="text-xs text-gray-400">A partir de</p>
                    <p className="text-xl font-bold text-[#00FF7F]">
                      R$ {pro.price.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <button className="bg-[#00FF7F] text-[#0D0D0D] font-semibold px-6 py-2 rounded-lg hover:bg-[#00CC66] transition-all">
                    Contratar
                  </button>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-start gap-3">
          <BadgeCheck className="w-5 h-5 text-[#00FF7F] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <p className="text-white font-medium mb-1">Profissionais verificados</p>
            <p>Todos os especialistas passam por verificação rigorosa de credenciais e experiência.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
