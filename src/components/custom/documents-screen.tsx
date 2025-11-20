"use client";

import { FileText, Upload, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { PremiumCard } from './premium-card';

export function DocumentsScreen() {
  const documents = [
    { name: 'RG', uploaded: true, required: true, date: '10/01/2025' },
    { name: 'CPF', uploaded: true, required: true, date: '10/01/2025' },
    { name: 'Comprovante de residência', uploaded: false, required: true, date: null },
    { name: 'Certidão de matrícula', uploaded: false, required: true, date: null },
    { name: 'IPTU 2024', uploaded: true, required: false, date: '09/01/2025' },
    { name: 'Planta do imóvel', uploaded: false, required: true, date: null },
  ];

  const uploadedCount = documents.filter(d => d.uploaded).length;
  const totalCount = documents.length;
  const progress = Math.round((uploadedCount / totalCount) * 100);

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Meus Documentos
          </h1>
          <p className="text-gray-400">
            Gerencie todos os documentos do processo
          </p>
        </div>

        {/* Progress Card */}
        <PremiumCard glow>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Documentos enviados</p>
                <p className="text-2xl font-bold text-white">{uploadedCount} de {totalCount}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#00FF7F]">{progress}%</p>
              </div>
            </div>
            <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </PremiumCard>

        {/* Upload Button */}
        <button className="w-full bg-[#00FF7F] text-[#0D0D0D] font-semibold py-4 px-8 rounded-xl hover:bg-[#00CC66] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,127,0.2)]">
          <Upload className="w-5 h-5" />
          Enviar novo documento
        </button>

        {/* Documents List */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Lista de documentos
          </h2>
          
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <PremiumCard key={index} hover={false}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    doc.uploaded ? 'bg-[#00FF7F]' : 'bg-[#2A2A2A]'
                  }`}>
                    {doc.uploaded ? (
                      <CheckCircle2 className="w-6 h-6 text-[#0D0D0D]" />
                    ) : (
                      <FileText className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-white">{doc.name}</h3>
                      {doc.required && !doc.uploaded && (
                        <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                          Obrigatório
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {doc.uploaded ? `Enviado em ${doc.date}` : 'Pendente de envio'}
                    </p>
                  </div>
                  {doc.uploaded ? (
                    <button className="text-[#00FF7F] hover:text-[#00CC66] transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Upload className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#00FF7F] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <p className="text-white font-medium mb-1">Dica importante</p>
            <p>Envie documentos em PDF ou imagem (JPG/PNG) com até 10MB. Certifique-se de que estão legíveis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
