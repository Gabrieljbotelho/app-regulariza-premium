// Tipos do Regulariza

export type PropertyType = 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'rural';

export type ProblemType = 
  | 'sem-escritura'
  | 'area-irregular'
  | 'construcao-irregular'
  | 'divida-iptu'
  | 'inventario'
  | 'usucapiao'
  | 'outro';

export type ProcessStatus = 'nao-iniciado' | 'em-analise' | 'documentacao' | 'em-andamento' | 'concluido';

export interface Property {
  id: string;
  type: PropertyType;
  address: string;
  problem: ProblemType;
  status: ProcessStatus;
  progress: number;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploaded: boolean;
  required: boolean;
  url?: string;
}

export interface Professional {
  id: string;
  name: string;
  role: 'advogado' | 'topografo' | 'engenheiro' | 'arquiteto';
  rating: number;
  reviews: number;
  price: number;
  avatar: string;
}

export type Screen = 
  | 'welcome'
  | 'questions'
  | 'dashboard'
  | 'process'
  | 'documents'
  | 'diagnosis'
  | 'marketplace'
  | 'help';
