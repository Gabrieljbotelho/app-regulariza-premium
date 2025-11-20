'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, DollarSign, Users, TrendingUp, Plus, Edit, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { UserProfile, ProfessionalService, ServiceRequest } from '@/lib/types';

interface ProfessionalPanelProps {
  userProfile: UserProfile;
}

export default function ProfessionalPanel({ userProfile }: ProfessionalPanelProps) {
  const [services, setServices] = useState<ProfessionalService[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [stats, setStats] = useState({
    totalServices: 0,
    activeRequests: 0,
    totalEarnings: 0,
    completedJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    service_name: '',
    description: '',
    price: 0,
    duration_days: 0
  });

  useEffect(() => {
    loadProfessionalData();
  }, []);

  const loadProfessionalData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Buscar perfil profissional
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      // Buscar serviços
      const { data: servicesData } = await supabase
        .from('professional_services')
        .select('*')
        .eq('professional_id', profile.id)
        .order('created_at', { ascending: false });

      setServices(servicesData || []);

      // Buscar solicitações
      const { data: requestsData } = await supabase
        .from('service_requests')
        .select('*')
        .eq('professional_id', profile.id)
        .order('created_at', { ascending: false });

      setRequests(requestsData || []);

      // Calcular estatísticas
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('professional_id', profile.id)
        .eq('status', 'completed');

      const totalEarnings = transactions?.reduce((sum, tx) => {
        return sum + (tx.amount - tx.platform_fee);
      }, 0) || 0;

      const completedJobs = requestsData?.filter(r => r.status === 'completed').length || 0;
      const activeRequests = requestsData?.filter(r => r.status === 'pending' || r.status === 'in_progress').length || 0;

      setStats({
        totalServices: servicesData?.length || 0,
        activeRequests,
        totalEarnings,
        completedJobs
      });

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      const { error } = await supabase
        .from('professional_services')
        .insert({
          professional_id: profile.id,
          ...newService
        });

      if (error) throw error;

      // Log de auditoria
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'service_created',
        entity_type: 'professional_service',
        metadata: newService
      });

      setShowAddService(false);
      setNewService({
        service_name: '',
        description: '',
        price: 0,
        duration_days: 0
      });
      loadProfessionalData();

    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF7F]">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a1a1a] to-[#0D0D0D] p-4 md:p-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Painel Profissional</h1>
        <p className="text-gray-400">Gerencie seus serviços e solicitações</p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#00FF7F]/20">
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="w-8 h-8 text-[#00FF7F]" />
            <span className="text-2xl font-bold text-white">{stats.totalServices}</span>
          </div>
          <p className="text-gray-400 text-sm">Serviços Ativos</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">{stats.activeRequests}</span>
          </div>
          <p className="text-gray-400 text-sm">Solicitações Ativas</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-white">R$ {stats.totalEarnings.toFixed(2)}</span>
          </div>
          <p className="text-gray-400 text-sm">Ganhos Totais</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-white">{stats.completedJobs}</span>
          </div>
          <p className="text-gray-400 text-sm">Trabalhos Concluídos</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Meus Serviços</h2>
          <button
            onClick={() => setShowAddService(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00FF7F]/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            Adicionar Serviço
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 hover:border-[#00FF7F]/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">{service.service_name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#00FF7F] font-bold text-lg">R$ {service.price.toFixed(2)}</span>
                <span className="text-gray-500 text-sm">{service.duration_days} dias</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Solicitações Recentes</h2>
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D0D0D]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Descrição</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Orçamento</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-[#0D0D0D]/50 transition-colors">
                    <td className="px-6 py-4 text-white">Cliente #{request.user_id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{request.description}</td>
                    <td className="px-6 py-4 text-[#00FF7F] font-semibold">
                      {request.budget ? `R$ ${request.budget.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        request.status === 'accepted' ? 'bg-blue-500/20 text-blue-500' :
                        request.status === 'in_progress' ? 'bg-purple-500/20 text-purple-500' :
                        request.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-[#00FF7F] text-black rounded-lg hover:bg-[#00CC66] transition-colors text-sm font-semibold">
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-[#00FF7F]/20">
            <h3 className="text-2xl font-bold text-white mb-6">Adicionar Novo Serviço</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Nome do Serviço</label>
                <input
                  type="text"
                  value={newService.service_name}
                  onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-lg text-white focus:border-[#00FF7F] focus:outline-none"
                  placeholder="Ex: Análise de Matrícula"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Descrição</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-lg text-white focus:border-[#00FF7F] focus:outline-none resize-none"
                  rows={3}
                  placeholder="Descreva o serviço..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-lg text-white focus:border-[#00FF7F] focus:outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Prazo (dias)</label>
                  <input
                    type="number"
                    value={newService.duration_days}
                    onChange={(e) => setNewService({ ...newService, duration_days: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-lg text-white focus:border-[#00FF7F] focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAddService(false)}
                className="flex-1 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddService}
                className="flex-1 py-3 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black rounded-lg hover:shadow-lg hover:shadow-[#00FF7F]/20 transition-all font-semibold"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
