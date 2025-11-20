"use client";

import { Clock, CheckCircle2, Truck, AlertCircle, FileText } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen, OrderStatus } from '@/lib/types';

interface OrdersScreenProps {
  onNavigate: (screen: Screen) => void;
}

// Mock data - em produção viria do Supabase
const mockOrders = [
  {
    id: '1',
    type: 'certificate',
    title: 'Certidão de Ônus e Ações',
    status: 'delivered' as OrderStatus,
    amount: 34.90,
    created_at: '2024-01-15',
    description: 'Matrícula 12345 - Rua das Flores, 123'
  },
  {
    id: '2',
    type: 'act',
    title: 'Escritura de Compra e Venda',
    status: 'processing' as OrderStatus,
    amount: 1250.00,
    created_at: '2024-01-10',
    description: 'Apartamento 101 - Valor: R$ 150.000,00'
  },
  {
    id: '3',
    type: 'certificate',
    title: 'Certidão Negativa de Propriedade',
    status: 'sent' as OrderStatus,
    amount: 24.90,
    created_at: '2024-01-08',
    description: 'CPF: 123.456.789-00'
  }
];

export default function OrdersScreen({ onNavigate }: OrdersScreenProps) {
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-500', text: 'Pendente' };
      case 'processing':
        return { icon: AlertCircle, color: 'text-blue-500', text: 'Em processamento' };
      case 'sent':
        return { icon: Truck, color: 'text-orange-500', text: 'Enviado ao cartório' };
      case 'delivered':
        return { icon: CheckCircle2, color: 'text-green-500', text: 'Entregue' };
      case 'cancelled':
        return { icon: AlertCircle, color: 'text-red-500', text: 'Cancelado' };
      default:
        return { icon: Clock, color: 'text-gray-500', text: 'Desconhecido' };
    }
  };

  const formatDate = (dateString: string) => {
    // Corrigido: usar formato fixo para evitar hydration mismatch
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Meus pedidos
          </h1>
          <p className="text-gray-400">
            Acompanhe o status dos seus serviços
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            return (
              <PremiumCard key={order.id}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{order.title}</h3>
                      <p className="text-sm text-gray-400">{order.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Pedido em {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                      <StatusIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">{statusInfo.text}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Valor pago: <span className="text-white font-medium">R$ {order.amount.toFixed(2)}</span>
                    </div>
                    {order.status === 'delivered' && (
                      <button className="text-[#00FF7F] hover:text-[#00CC66] text-sm font-medium">
                        Baixar documento
                      </button>
                    )}
                  </div>
                </div>
              </PremiumCard>
            );
          })}
        </div>

        {/* Empty State */}
        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum pedido encontrado</h3>
            <p className="text-gray-400 mb-6">
              Você ainda não fez nenhum pedido. Que tal começar agora?
            </p>
            <button
              onClick={() => onNavigate('need-selection')}
              className="bg-[#00FF7F] hover:bg-[#00CC66] text-[#0D0D0D] font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Fazer primeiro pedido
            </button>
          </div>
        )}

        {/* Help */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
          <p className="text-sm text-gray-400 text-center">
            💡 <strong>Dúvidas?</strong> Entre em contato conosco se precisar de ajuda
            com seus pedidos.
          </p>
        </div>
      </div>
    </div>
  );
}
