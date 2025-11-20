"use client";

import { Sparkles, Users, FileSearch, TrendingUp, Clock, CheckCircle2, Play } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen } from '@/lib/types';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Olá, João! 👋
          </h1>
          <p className="text-gray-400">
            Vamos regularizar seu imóvel hoje?
          </p>
        </div>

        {/* Start Process Card */}
        <PremiumCard glow onClick={() => onNavigate('need-selection')}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-xl flex items-center justify-center">
              <Play className="w-7 h-7 text-[#0D0D0D]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Iniciar novo processo</h3>
              <p className="text-sm text-gray-400">Certidões, atos ou regularização</p>
            </div>
          </div>
        </PremiumCard>

        {/* Status Card */}
        <PremiumCard glow className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00FF7F] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#0D0D0D]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Seu processo</p>
                  <p className="text-lg font-semibold text-white">Em andamento</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#00FF7F]">65%</p>
                <p className="text-xs text-gray-400">completo</p>
              </div>
            </div>
            <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] w-[65%]"></div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Prazo estimado: 45 dias</span>
            </div>
          </div>
        </PremiumCard>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ações rápidas
          </h2>
          
          <PremiumCard onClick={() => onNavigate('diagnosis')}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-[#0D0D0D]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Diagnosticar meu imóvel</h3>
                <p className="text-sm text-gray-400">Análise inteligente com IA</p>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard onClick={() => onNavigate('marketplace')}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2A2A2A] rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-[#00FF7F]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Contratar especialista</h3>
                <p className="text-sm text-gray-400">Advogados e topógrafos</p>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard onClick={() => onNavigate('orders')}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2A2A2A] rounded-xl flex items-center justify-center">
                <FileSearch className="w-7 h-7 text-[#00FF7F]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Meus pedidos</h3>
                <p className="text-sm text-gray-400">Acompanhe seus serviços</p>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Atividades recentes
          </h2>
          
          <div className="space-y-2">
            {[
              { text: 'Documento \"RG\" enviado', time: '2h atrás', completed: true },
              { text: 'Análise do topógrafo agendada', time: '1 dia atrás', completed: true },
              { text: 'Aguardando certidão do cartório', time: '3 dias atrás', completed: false },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"
              >
                <CheckCircle2 className={`w-5 h-5 ${activity.completed ? 'text-[#00FF7F]' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}