"use client";

import { Home, FileText, FolderOpen, MessageCircle, BarChart3, LogOut } from 'lucide-react';
import { Screen } from '@/lib/types';

interface NavigationBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function NavigationBar({ currentScreen, onNavigate, onLogout }: NavigationBarProps) {
  const navItems = [
    { screen: 'dashboard' as Screen, icon: Home, label: 'Início' },
    { screen: 'process' as Screen, icon: BarChart3, label: 'Processo' },
    { screen: 'documents' as Screen, icon: FolderOpen, label: 'Docs' },
    { screen: 'diagnosis' as Screen, icon: FileText, label: 'Diagnóstico' },
    { screen: 'help' as Screen, icon: MessageCircle, label: 'Ajuda' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] px-4 py-3 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map(({ screen, icon: Icon, label }) => (
          <button
            key={screen}
            onClick={() => onNavigate(screen)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              currentScreen === screen
                ? 'text-[#00FF7F]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-1 transition-all duration-200 text-gray-400 hover:text-red-500"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-medium">Sair</span>
        </button>
      </div>
    </nav>
  );
}
