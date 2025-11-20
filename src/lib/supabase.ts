import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente do Supabase com valores padrão seguros
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Tipos do banco de dados
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  cep: string;
  via: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string;
  estado: string;
  cidade: string;
  created_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  type: 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'rural';
  address_id: string;
  problem: string;
  status: 'nao-iniciado' | 'em-analise' | 'documentacao' | 'em-andamento' | 'concluido';
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  property_id: string;
  name: string;
  type: string;
  uploaded: boolean;
  required: boolean;
  url?: string;
  created_at: string;
}
