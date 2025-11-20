"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, FileText, Loader2, Bot, User as UserIcon, DollarSign } from 'lucide-react';
import { PremiumCard } from './premium-card';
import { ChatMessage, ChatAttachment, UserProfile, PROFILE_TOOLS } from '@/lib/types';

interface AIAssistantScreenProps {
  userProfile: UserProfile;
  onRequestBudget?: (serviceType: string, description: string) => void;
}

export default function AIAssistantScreen({ userProfile, onRequestBudget }: AIAssistantScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const profileTools = PROFILE_TOOLS[userProfile];

  useEffect(() => {
    // Mensagem de boas-vindas personalizada
    const welcomeMessage: ChatMessage = {
      id: '1',
      role: 'assistant',
      content: `Olá! Sou seu assistente especializado para ${profileTools.description.toLowerCase()}.\n\n🔧 **Ferramentas disponíveis:**\n${profileTools.tools.map(tool => `• ${tool}`).join('\n')}\n\nComo posso ajudar você hoje?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [userProfile, profileTools]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: ChatAttachment[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      size: file.size
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setAttachments([]);
    setIsLoading(true);

    try {
      // Chamar API de IA
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          profile: userProfile,
          attachments: userMessage.attachments,
          conversationHistory: messages
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Se a IA sugerir orçamento
      if (data.suggestBudget && onRequestBudget) {
        // Adicionar botão de orçamento
        const budgetMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          role: 'system',
          content: `💰 **Orçamento sugerido:** ${data.budgetInfo.serviceType}\n\nDeseja solicitar um orçamento para este serviço?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, budgetMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-[#2A2A2A] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#0D0D0D]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Assistente IA</h1>
              <p className="text-sm text-gray-400">{profileTools.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-[#00FF7F]' 
                  : message.role === 'system'
                  ? 'bg-orange-500'
                  : 'bg-[#2A2A2A]'
              }`}>
                {message.role === 'user' ? (
                  <UserIcon className="w-5 h-5 text-[#0D0D0D]" />
                ) : message.role === 'system' ? (
                  <DollarSign className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-[#00FF7F]" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : ''}`}>
                <PremiumCard className={`${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-[#00FF7F] to-[#00CC66]' 
                    : message.role === 'system'
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                    : 'bg-[#1A1A1A]'
                }`}>
                  <p className={`text-sm whitespace-pre-wrap ${
                    message.role === 'user' ? 'text-[#0D0D0D]' : 'text-white'
                  }`}>
                    {message.content}
                  </p>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-center gap-2 bg-[#0D0D0D] bg-opacity-20 rounded-lg p-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span className="text-xs flex-1 truncate">{att.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </PremiumCard>
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#00FF7F]" />
              </div>
              <PremiumCard className="bg-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#00FF7F] animate-spin" />
                  <span className="text-sm text-gray-400">Analisando...</span>
                </div>
              </PremiumCard>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-[#0D0D0D] border-t border-[#2A2A2A] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 bg-[#1A1A1A] rounded-lg px-3 py-2 border border-[#2A2A2A]"
                >
                  <FileText className="w-4 h-4 text-[#00FF7F]" />
                  <span className="text-xs text-white truncate max-w-[150px]">{att.name}</span>
                  <button
                    onClick={() => removeAttachment(att.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#00FF7F] transition-colors flex-shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              rows={1}
              className="flex-1 bg-[#1A1A1A] text-white rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#00FF7F] border border-[#2A2A2A]"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />

            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && attachments.length === 0)}
              className="w-10 h-10 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-xl flex items-center justify-center text-[#0D0D0D] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
