'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AuthScreen from '@/components/custom/auth-screen';
import WelcomeScreen from '@/components/custom/welcome-screen';
import QuestionsScreen from '@/components/custom/questions-screen';
import DashboardScreen from '@/components/custom/dashboard-screen';
import ProcessScreen from '@/components/custom/process-screen';
import DocumentsScreen from '@/components/custom/documents-screen';
import DiagnosisScreen from '@/components/custom/diagnosis-screen';
import MarketplaceScreen from '@/components/custom/marketplace-screen';
import HelpScreen from '@/components/custom/help-screen';
import NavigationBar from '@/components/custom/navigation-bar';
import type { Screen } from '@/lib/types';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  useEffect(() => {
    // Verificar se usuário está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentScreen('welcome');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF7F] text-xl">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('questions')} />;
      case 'questions':
        return <QuestionsScreen onComplete={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case 'process':
        return <ProcessScreen />;
      case 'documents':
        return <DocumentsScreen />;
      case 'diagnosis':
        return <DiagnosisScreen />;
      case 'marketplace':
        return <MarketplaceScreen />;
      case 'help':
        return <HelpScreen />;
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-20">
      {renderScreen()}
      <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} onLogout={handleLogout} />
    </div>
  );
}
