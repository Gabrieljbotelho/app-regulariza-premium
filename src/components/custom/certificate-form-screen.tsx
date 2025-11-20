"use client";

import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, CertificateSubclass, CERTIFICATE_SUBCLASSES } from '@/lib/types';

interface CertificateFormScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  subclassId: string;
}

export default function CertificateFormScreen({ onNavigate, subclassId }: CertificateFormScreenProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Encontrar a subclasse
  const subclass = Object.values(CERTIFICATE_SUBCLASSES)
    .flat()
    .find(s => s.id === subclassId);

  if (!subclass) {
    return <div>Subclasse não encontrada</div>;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validar campos obrigatórios
    const missingFields = subclass.required_fields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Por favor, preencha os campos: ${missingFields.join(', ')}`);
      return;
    }

    // Calcular valor total (taxa do cartório + taxa de serviço)
    const platformFee = 9.90; // Taxa de serviço da plataforma
    const totalAmount = subclass.estimated_cost + platformFee;

    onNavigate('payment', {
      type: 'certificate',
      subclassId,
      data: formData,
      amount: totalAmount,
      platformFee,
      cartorioFee: subclass.estimated_cost
    });
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      matricula: 'Matrícula do imóvel',
      proprietario: 'Nome do proprietário',
      cpf_cnpj: 'CPF ou CNPJ',
      nome: 'Nome completo',
      data_nascimento: 'Data de nascimento',
      data_casamento: 'Data do casamento',
      data_obito: 'Data do óbito',
      livro: 'Livro',
      folha: 'Folha',
      valor: 'Valor do imóvel/ato',
      partes: 'Partes envolvidas',
      imovel: 'Descrição do imóvel',
      doador: 'Nome do doador',
      donatario: 'Nome do donatário',
      bem: 'Descrição do bem',
      outorgante: 'Nome do outorgante',
      outorgado: 'Nome do outorgado',
      poderes: 'Poderes concedidos'
    };
    return labels[field] || field;
  };

  const getFieldType = (field: string) => {
    if (field.includes('data')) return 'date';
    if (field.includes('cpf') || field.includes('valor')) return 'text';
    return 'text';
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Informações necessárias
          </h1>
          <p className="text-gray-400">
            Preencha os dados para {subclass.name.toLowerCase()}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {subclass.required_fields.map((field) => (
            <PremiumCard key={field}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">
                  {getFieldLabel(field)}
                </label>
                <input
                  type={getFieldType(field)}
                  value={formData[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F]"
                  placeholder={`Digite ${getFieldLabel(field).toLowerCase()}`}
                />
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* Cost Summary */}
        <PremiumCard>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Resumo dos custos</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa do cartório:</span>
                <span className="text-white">R$ {subclass.estimated_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa de serviço:</span>
                <span className="text-white">R$ 9.90</span>
              </div>
              <hr className="border-[#2A2A2A]" />
              <div className="flex justify-between font-semibold">
                <span className="text-white">Total:</span>
                <span className="text-[#00FF7F]">R$ {(subclass.estimated_cost + 9.90).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#00FF7F] hover:bg-[#00CC66] text-[#0D0D0D] font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Continuar para pagamento
        </button>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('certificate-subclass', { classId: subclass.class_id })}
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