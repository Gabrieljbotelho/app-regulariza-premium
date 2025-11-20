"use client";

import { useState } from 'react';
import { ArrowLeft, Send, FileText } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, CertificateSubclass, CERTIFICATE_SUBCLASSES } from '@/lib/types';

interface ActFormScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  subclassId: string;
}

export default function ActFormScreen({ onNavigate, subclassId }: ActFormScreenProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Encontrar a subclasse
  const subclass = CERTIFICATE_SUBCLASSES['C'].find(s => s.id === subclassId);

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

    // Calcular valor total
    let cartorioFee = subclass.estimated_cost;
    if (subclass.id === 'C1' && formData.valor) {
      // Para compra e venda, calcular baseado no valor
      cartorioFee = parseFloat(formData.valor) * subclass.estimated_cost;
    }

    const platformFee = 19.90; // Taxa maior para atos
    const totalAmount = cartorioFee + platformFee;

    onNavigate('payment', {
      type: 'act',
      subclassId,
      data: formData,
      amount: totalAmount,
      platformFee,
      cartorioFee
    });
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      valor: 'Valor do imóvel/ato (R$)',
      partes: 'Partes envolvidas (nomes completos)',
      imovel: 'Descrição completa do imóvel',
      doador: 'Nome completo do doador',
      donatario: 'Nome completo do donatário',
      bem: 'Descrição completa do bem',
      outorgante: 'Nome completo do outorgante',
      outorgado: 'Nome completo do outorgado',
      poderes: 'Poderes a serem concedidos'
    };
    return labels[field] || field;
  };

  const getFieldType = (field: string) => {
    if (field === 'valor') return 'number';
    return 'text';
  };

  const getFieldPlaceholder = (field: string) => {
    const placeholders: Record<string, string> = {
      valor: 'Ex: 150000.00',
      partes: 'Ex: João Silva e Maria Santos',
      imovel: 'Ex: Apartamento 101, Rua das Flores, 123',
      doador: 'Ex: João Silva',
      donatario: 'Ex: Maria Santos',
      bem: 'Ex: Imóvel matrícula 12345',
      outorgante: 'Ex: João Silva',
      outorgado: 'Ex: Maria Santos',
      poderes: 'Ex: Comprar, vender, hipotecar imóveis'
    };
    return placeholders[field] || `Digite ${getFieldLabel(field).toLowerCase()}`;
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Informações para o ato
          </h1>
          <p className="text-gray-400">
            Preencha os dados necessários para {subclass.name.toLowerCase()}
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
                {field === 'poderes' ? (
                  <textarea
                    value={formData[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F] resize-none"
                    placeholder={getFieldPlaceholder(field)}
                    rows={3}
                  />
                ) : (
                  <input
                    type={getFieldType(field)}
                    value={formData[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F]"
                    placeholder={getFieldPlaceholder(field)}
                  />
                )}
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* Documents Required */}
        <PremiumCard>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos necessários
            </h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>• RG e CPF das partes envolvidas</p>
              <p>• Certidão de casamento (se aplicável)</p>
              <p>• Comprovante de endereço</p>
              <p>• Documentos do imóvel (se aplicável)</p>
              <p>• Comprovante de pagamento do ITBI (compra e venda)</p>
            </div>
          </div>
        </PremiumCard>

        {/* Cost Summary */}
        <PremiumCard>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Resumo dos custos</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa do cartório:</span>
                <span className="text-white">
                  {subclass.id === 'C1' && formData.valor
                    ? `R$ ${(parseFloat(formData.valor) * subclass.estimated_cost).toFixed(2)}`
                    : `R$ ${subclass.estimated_cost.toFixed(2)}`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa de serviço:</span>
                <span className="text-white">R$ 19.90</span>
              </div>
              <hr className="border-[#2A2A2A]" />
              <div className="flex justify-between font-semibold">
                <span className="text-white">Total estimado:</span>
                <span className="text-[#00FF7F]">
                  {subclass.id === 'C1' && formData.valor
                    ? `R$ ${(parseFloat(formData.valor) * subclass.estimated_cost + 19.90).toFixed(2)}`
                    : `R$ ${(subclass.estimated_cost + 19.90).toFixed(2)}`
                  }
                </span>
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
            onClick={() => onNavigate('act-selection')}
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