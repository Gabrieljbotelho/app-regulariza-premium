"use client";

import { Home, FileText, FolderOpen, MessageCircle, BarChart3, Bot, LogOut } from 'lucide-react';
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
    { screen: 'ai-assistant' as Screen, icon: Bot, label: 'IA', highlight: true },
    { screen: 'documents' as Screen, icon: FolderOpen, label: 'Docs' },
    { screen: 'help' as Screen, icon: MessageCircle, label: 'Ajuda' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] px-2 sm:px-4 py-2 sm:py-3 z-50 safe-area-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map(({ screen, icon: Icon, label, highlight }) => (
          <button
            key={screen}
            onClick={() => onNavigate(screen)}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 min-w-[60px] sm:min-w-[70px] relative ${
              currentScreen === screen
                ? 'text-[#00FF7F]'
                : highlight
                ? 'text-[#00FF7F] hover:text-[#00CC66]'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label={label}
          >
            {highlight && currentScreen !== screen && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00FF7F] rounded-full animate-pulse"></div>
            )}
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{label}</span>
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 text-gray-400 hover:text-red-500 min-w-[60px] sm:min-w-[70px]"
          aria-label="Sair"
        >
          <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs font-medium">Sair</span>
        </button>
      </div>
    </nav>
  );
}
