'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;
      
      if (data.user) {
        onAuthSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
          },
        },
      });

      if (error) throw error;
      
      if (data.user) {
        onAuthSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-xl flex items-center justify-center">
            <span className="text-black font-bold text-xl">R</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Regulariza</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        {isLogin ? (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-400 mb-6 sm:mb-8">Entre para continuar sua jornada</p>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Card className="bg-red-500/10 border-red-500/20 p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </Card>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#00FF7F] hover:underline text-sm sm:text-base"
              >
                Não tem conta? Cadastre-se
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setIsLogin(true)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Criar conta</h2>
            <p className="text-gray-400 mb-6 sm:mb-8">Comece sua regularização agora</p>

            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <Card className="bg-red-500/10 border-red-500/20 p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </Card>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="João Silva"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="w-full bg-[#1A1A1A] border-gray-800 pl-11 text-white placeholder-gray-500 focus:ring-[#00FF7F] focus:border-[#00FF7F]"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#00FF7F] hover:underline text-sm sm:text-base"
              >
                Já tem conta? Faça login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
