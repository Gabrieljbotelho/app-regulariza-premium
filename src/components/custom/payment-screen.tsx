"use client";

import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { Screen } from '@/lib/types';

interface PaymentScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  paymentData: any;
}

export default function PaymentScreen({ onNavigate, paymentData }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simular processamento
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // Simular redirecionamento após sucesso
      setTimeout(() => {
        onNavigate('orders');
      }, 2000);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen px-6 py-8 pb-24">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
          <CheckCircle2 className="w-20 h-20 text-[#00FF7F] mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Pagamento realizado!
          </h1>
          <p className="text-gray-400 mb-8">
            Seu pedido foi enviado ao cartório. Você pode acompanhar o status na tela de pedidos.
          </p>
          <button
            onClick={() => onNavigate('orders')}
            className="bg-[#00FF7F] hover:bg-[#00CC66] text-[#0D0D0D] font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Ver meus pedidos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Finalizar pedido
          </h1>
          <p className="text-gray-400">
            Escolha a forma de pagamento
          </p>
        </div>

        {/* Order Summary */}
        <PremiumCard>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Resumo do pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white capitalize">{paymentData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa do cartório:</span>
                <span className="text-white">R$ {paymentData.cartorioFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa de serviço:</span>
                <span className="text-white">R$ {paymentData.platformFee.toFixed(2)}</span>
              </div>
              <hr className="border-[#2A2A2A]" />
              <div className="flex justify-between font-semibold">
                <span className="text-white">Total:</span>
                <span className="text-[#00FF7F]">R$ {paymentData.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Forma de pagamento</h2>

          <PremiumCard
            onClick={() => setPaymentMethod('pix')}
            className={`cursor-pointer ${paymentMethod === 'pix' ? 'ring-2 ring-[#00FF7F]' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === 'pix' ? 'bg-[#00FF7F]' : 'bg-[#2A2A2A]'
              }`}>
                <Smartphone className={`w-6 h-6 ${paymentMethod === 'pix' ? 'text-[#0D0D0D]' : 'text-[#00FF7F]'}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">PIX</h3>
                <p className="text-sm text-gray-400">Pagamento instantâneo</p>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard
            onClick={() => setPaymentMethod('card')}
            className={`cursor-pointer ${paymentMethod === 'card' ? 'ring-2 ring-[#00FF7F]' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === 'card' ? 'bg-[#00FF7F]' : 'bg-[#2A2A2A]'
              }`}>
                <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-[#0D0D0D]' : 'text-[#00FF7F]'}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Cartão de crédito</h3>
                <p className="text-sm text-gray-400">Parcelamento disponível</p>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-600 text-[#0D0D0D] font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin"></div>
              Processando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pagar R$ {paymentData.amount.toFixed(2)}
            </>
          )}
        </button>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
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