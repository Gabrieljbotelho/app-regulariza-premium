"use client";

import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { PremiumCard } from './premium-card';

export default function ProcessScreen() {
  const steps = [
    { title: 'Análise inicial', description: 'Documentos recebidos e validados', completed: true, current: false },
    { title: 'Levantamento topográfico', description: 'Agendado para 15/01/2025', completed: false, current: true },
    { title: 'Análise jurídica', description: 'Aguardando etapa anterior', completed: false, current: false },
    { title: 'Protocolo na prefeitura', description: 'Pendente', completed: false, current: false },
    { title: 'Registro no cartório', description: 'Pendente', completed: false, current: false },
  ];

  const missingDocs = [
    { name: 'Certidão de matrícula atualizada', urgent: true },
    { name: 'Comprovante de residência', urgent: false },
    { name: 'Planta do imóvel', urgent: true },
  ];

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Meu Processo
          </h1>
          <p className="text-gray-400">
            Acompanhe cada etapa da regularização
          </p>
        </div>

        {/* Progress Overview */}
        <PremiumCard glow>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Progresso geral</p>
                <p className="text-2xl font-bold text-white">65%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Prazo estimado</p>
                <p className="text-lg font-semibold text-[#00FF7F]">45 dias</p>
              </div>
            </div>
            <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] w-[65%]"></div>
            </div>
          </div>
        </PremiumCard>

        {/* Steps Timeline */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Etapas do processo
          </h2>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-8 bg-[#2A2A2A]"></div>
                )}
                <PremiumCard
                  hover={false}
                  className={step.current ? 'border-[#00FF7F] bg-[#00FF7F]/5' : ''}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      step.completed
                        ? 'bg-[#00FF7F]'
                        : step.current
                        ? 'bg-[#00FF7F]/20 border-2 border-[#00FF7F]'
                        : 'bg-[#2A2A2A]'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-[#0D0D0D]" />
                      ) : step.current ? (
                        <Clock className="w-6 h-6 text-[#00FF7F]" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                      {step.current && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#00FF7F] bg-[#00FF7F]/10 px-2 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 bg-[#00FF7F] rounded-full animate-pulse"></div>
                          Em andamento
                        </div>
                      )}
                    </div>
                  </div>
                </PremiumCard>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Documents */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Documentos faltando
          </h2>
          
          <div className="space-y-2">
            {missingDocs.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"
              >
                <AlertCircle className={`w-5 h-5 ${doc.urgent ? 'text-orange-500' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <p className="text-sm text-white">{doc.name}</p>
                  {doc.urgent && (
                    <p className="text-xs text-orange-500 mt-0.5">Urgente</p>
                  )}
                </div>
                <button className="text-sm text-[#00FF7F] font-medium hover:underline">
                  Enviar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
