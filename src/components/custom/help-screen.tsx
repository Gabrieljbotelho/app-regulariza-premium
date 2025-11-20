"use client";

import { MessageCircle, Send, HelpCircle, Book, Phone } from 'lucide-react';
import { PremiumCard } from './premium-card';

export function HelpScreen() {
  const faqs = [
    {
      question: 'Quanto tempo leva o processo?',
      answer: 'Em média, de 45 a 90 dias, dependendo da complexidade.',
    },
    {
      question: 'Quais documentos são necessários?',
      answer: 'RG, CPF, comprovante de residência, certidão de matrícula e IPTU.',
    },
    {
      question: 'Quanto custa a regularização?',
      answer: 'Varia entre R$ 5.000 e R$ 15.000, dependendo do caso.',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ajuda & Suporte
          </h1>
          <p className="text-gray-400">
            Estamos aqui para ajudar você
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <PremiumCard>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-[#00FF7F] rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <p className="text-sm font-medium text-white">Chat ao vivo</p>
            </div>
          </PremiumCard>

          <PremiumCard>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-[#2A2A2A] rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#00FF7F]" />
              </div>
              <p className="text-sm font-medium text-white">Ligar</p>
            </div>
          </PremiumCard>
        </div>

        {/* Chat */}
        <PremiumCard glow>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00FF7F] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#0D0D0D]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Suporte Regulariza</p>
                <p className="text-xs text-gray-400">Online agora</p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              <div className="bg-[#2A2A2A] rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                <p className="text-sm text-white">
                  Olá! Como posso ajudar você hoje?
                </p>
                <p className="text-xs text-gray-500 mt-1">10:30</p>
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-[#2A2A2A] text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FF7F]"
              />
              <button className="w-12 h-12 bg-[#00FF7F] rounded-xl flex items-center justify-center hover:bg-[#00CC66] transition-colors">
                <Send className="w-5 h-5 text-[#0D0D0D]" />
              </button>
            </div>
          </div>
        </PremiumCard>

        {/* FAQs */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <HelpCircle className="w-6 h-6 text-[#00FF7F]" />
            Perguntas frequentes
          </h2>
          
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <PremiumCard key={index} hover={false}>
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-white">{faq.question}</h3>
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>

        {/* Resources */}
        <PremiumCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2A2A2A] rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-[#00FF7F]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-white">Central de ajuda</h3>
              <p className="text-sm text-gray-400">Guias e tutoriais completos</p>
            </div>
          </div>
        </PremiumCard>

        {/* Contact Info */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center space-y-2">
          <p className="text-sm text-gray-400">Horário de atendimento</p>
          <p className="text-white font-medium">Segunda a Sexta, 8h às 18h</p>
          <p className="text-sm text-[#00FF7F]">contato@regulariza.com.br</p>
        </div>
      </div>
    </div>
  );
}
