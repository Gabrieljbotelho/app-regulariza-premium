// Tipos de telas do aplicativo
export type Screen = 
  | 'welcome' 
  | 'profile-selection'
  | 'questions' 
  | 'dashboard' 
  | 'process' 
  | 'documents' 
  | 'diagnosis' 
  | 'marketplace' 
  | 'help'
  | 'ai-assistant'
  | 'kyc-verification'
  | 'professional-panel'
  | 'upload-documents'
  | 'payment'
  | 'need-selection'
  | 'certificate-class'
  | 'certificate-subclass'
  | 'certificate-form'
  | 'act-selection'
  | 'act-form'
  | 'complex-case'
  | 'orders';

// Tipos de perfil de usuário
export type UserProfile = 
  | 'comum' 
  | 'advogado' 
  | 'corretor' 
  | 'engenheiro';

// Status KYC
export type KYCStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

// Status de documentos
export type DocumentStatus = 'pending' | 'analyzing' | 'analyzed' | 'error';

// Status de transações
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

// Status de solicitações de serviço
export type ServiceRequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

// Status de pedidos
export type OrderStatus = 'pending' | 'processing' | 'sent' | 'delivered' | 'cancelled';

// Interface de perfil do usuário
export interface UserProfileData {
  id: string;
  user_id: string;
  profile_type: UserProfile;
  full_name: string;
  phone?: string;
  document?: string; // CPF ou CNPJ
  professional_id?: string; // OAB, CRECI, CREA, CAU
  bio?: string;
  avatar_url?: string;
  is_verified: boolean;
  kyc_status: KYCStatus;
  kyc_document_url?: string;
  kyc_selfie_url?: string;
  created_at: string;
  updated_at: string;
}

// Documento enviado
export interface DocumentData {
  id: string;
  user_id: string;
  property_id?: string;
  name: string;
  type: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  status: DocumentStatus;
  analysis_result?: any;
  uploaded_at: string;
}

// Relatório de análise
export interface AnalysisReport {
  id: string;
  user_id: string;
  document_ids: string[];
  analysis_type: string;
  result: any;
  recommendations: string[];
  required_professionals: string[];
  missing_documents: string[];
  estimated_cost?: number;
  created_at: string;
}

// Transação
export interface Transaction {
  id: string;
  user_id: string;
  professional_id?: string;
  type: 'analysis' | 'service' | 'consultation';
  amount: number;
  platform_fee: number;
  status: TransactionStatus;
  payment_method?: string;
  payment_id?: string;
  metadata?: any;
  created_at: string;
  completed_at?: string;
}

// Serviço profissional
export interface ProfessionalService {
  id: string;
  professional_id: string;
  service_name: string;
  description?: string;
  price: number;
  duration_days?: number;
  is_active: boolean;
  created_at: string;
}

// Solicitação de serviço
export interface ServiceRequest {
  id: string;
  user_id: string;
  professional_id?: string;
  service_id?: string;
  status: ServiceRequestStatus;
  description?: string;
  budget?: number;
  created_at: string;
  updated_at: string;
}

// Log de auditoria
export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  metadata?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Ferramentas disponíveis por perfil
export interface ProfileTools {
  profile: UserProfile;
  tools: string[];
  description: string;
}

// Mensagem do chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
}

// Anexo do chat
export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// Orçamento
export interface Budget {
  id: string;
  user_id: string;
  service_type: string;
  description: string;
  estimated_price: number;
  professional_type: UserProfile;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: string;
}

// Pedido
export interface Order {
  id: string;
  user_id: string;
  type: 'certificate' | 'act' | 'complex';
  class_id?: string;
  subclass_id?: string;
  data: any; // dados específicos do pedido
  status: OrderStatus;
  amount: number;
  platform_fee: number;
  created_at: string;
  updated_at: string;
}

// Classe de certidão/ato
export interface CertificateClass {
  id: string;
  name: string;
  description: string;
  type: 'certificate' | 'act';
}

// Subclasse
export interface CertificateSubclass {
  id: string;
  class_id: string;
  name: string;
  description: string;
  required_fields: string[];
  estimated_cost: number;
  processing_time: string;
}

// Necessidade
export type NeedType = 'certificate' | 'act' | 'complex' | 'other';

// Constantes de ferramentas por perfil
export const PROFILE_TOOLS: Record<UserProfile, ProfileTools> = {
  comum: {
    profile: 'comum',
    description: 'Ferramentas para usuários comuns',
    tools: [
      'Explicação simplificada de termos jurídicos',
      'Fluxo de regularização passo a passo',
      'Geração de lista de documentos',
      'Orientação sobre profissionais',
      'Diagnóstico básico do imóvel'
    ]
  },
  advogado: {
    profile: 'advogado',
    description: 'Ferramentas jurídicas especializadas',
    tools: [
      'Geração de minutas jurídicas',
      'Análise de matrícula',
      'Identificação de riscos jurídicos',
      'Contratos especializados',
      'Estratégias de regularização',
      'Checklist jurídico detalhado'
    ]
  },
  corretor: {
    profile: 'corretor',
    description: 'Ferramentas para corretores e imobiliárias',
    tools: [
      'Análise comercial do imóvel',
      'Valoração aproximada',
      'Geração de descrição de anúncio',
      'Checklist para venda segura',
      'Diagnóstico de pendências',
      'Roteiro de regularização pré-venda',
      'Comparação entre imóveis'
    ]
  },
  engenheiro: {
    profile: 'engenheiro',
    description: 'Ferramentas técnicas especializadas',
    tools: [
      'Orientações sobre ART/RRT',
      'Projetos e aprovação de prefeitura',
      'Análise de conformidade com código de obras',
      'Checklist de documentação técnica',
      'Modelos de croquis e memoriais',
      'Sugestões de adequações',
      'Passo a passo de regularização técnica'
    ]
  }
};

// Constantes de preços
export const PRICING = {
  DOCUMENT_ANALYSIS: 49.90,
  CONSULTATION: 99.90,
  PLATFORM_FEE_PERCENTAGE: 15, // 15% de comissão da plataforma
};

// Classes de certidão
export const CERTIFICATE_CLASSES: CertificateClass[] = [
  {
    id: 'A',
    name: 'Registro de Imóveis',
    description: 'Certidões e atos relacionados ao registro imobiliário',
    type: 'certificate'
  },
  {
    id: 'B',
    name: 'Registro Civil de Pessoas Naturais',
    description: 'Certidões de nascimento, casamento, óbito e averbações',
    type: 'certificate'
  },
  {
    id: 'C',
    name: 'Notas / Tabelionato de Notas',
    description: 'Atos notariais, escrituras e procurações',
    type: 'act'
  },
  {
    id: 'D',
    name: 'Outras buscas / pesquisas',
    description: 'Pesquisas especializadas em CPF/CNPJ ou nome',
    type: 'certificate'
  }
];

// Subclasses
export const CERTIFICATE_SUBCLASSES: Record<string, CertificateSubclass[]> = {
  A: [
    {
      id: 'A1',
      class_id: 'A',
      name: 'Certidão de inteiro teor (matrícula) do imóvel',
      description: 'Certidão completa da matrícula imobiliária',
      required_fields: ['matricula'],
      estimated_cost: 25.00,
      processing_time: '2-5 dias úteis'
    },
    {
      id: 'A2',
      class_id: 'A',
      name: 'Certidão de ônus e ações reais',
      description: 'Verificação de gravames e ações sobre o imóvel',
      required_fields: ['matricula', 'proprietario'],
      estimated_cost: 20.00,
      processing_time: '1-3 dias úteis'
    },
    {
      id: 'A3',
      class_id: 'A',
      name: 'Certidão negativa de propriedade',
      description: 'Comprovação de ausência de registro',
      required_fields: ['cpf_cnpj', 'nome'],
      estimated_cost: 15.00,
      processing_time: '1-2 dias úteis'
    },
    {
      id: 'A4',
      class_id: 'A',
      name: 'Certidão quinzenária/vintenária',
      description: 'Histórico de 15 ou 20 anos do imóvel',
      required_fields: ['matricula'],
      estimated_cost: 35.00,
      processing_time: '3-7 dias úteis'
    },
    {
      id: 'A5',
      class_id: 'A',
      name: 'Busca por nome/CPF para imóveis',
      description: 'Pesquisa de imóveis em nome de pessoa física/jurídica',
      required_fields: ['cpf_cnpj', 'nome'],
      estimated_cost: 30.00,
      processing_time: '2-4 dias úteis'
    }
  ],
  B: [
    {
      id: 'B1',
      class_id: 'B',
      name: 'Certidão de nascimento',
      description: 'Certidão de nascimento em breve ou inteiro teor',
      required_fields: ['nome', 'data_nascimento', 'livro', 'folha'],
      estimated_cost: 15.00,
      processing_time: '1-2 dias úteis'
    },
    {
      id: 'B2',
      class_id: 'B',
      name: 'Certidão de casamento',
      description: 'Certidão de casamento em breve ou inteiro teor',
      required_fields: ['nome', 'data_casamento', 'livro', 'folha'],
      estimated_cost: 15.00,
      processing_time: '1-2 dias úteis'
    },
    {
      id: 'B3',
      class_id: 'B',
      name: 'Certidão de óbito',
      description: 'Certidão de óbito',
      required_fields: ['nome', 'data_obito', 'livro', 'folha'],
      estimated_cost: 15.00,
      processing_time: '1-2 dias úteis'
    }
  ],
  C: [
    {
      id: 'C1',
      class_id: 'C',
      name: 'Escritura de Compra e Venda',
      description: 'Escritura pública de compra e venda de imóvel',
      required_fields: ['valor', 'partes', 'imovel'],
      estimated_cost: 0.0075, // 0.75% do valor
      processing_time: '5-10 dias úteis'
    },
    {
      id: 'C2',
      class_id: 'C',
      name: 'Doação',
      description: 'Escritura pública de doação',
      required_fields: ['doador', 'donatario', 'bem'],
      estimated_cost: 0.01, // 1% do valor
      processing_time: '3-7 dias úteis'
    },
    {
      id: 'C3',
      class_id: 'C',
      name: 'Procuração',
      description: 'Procuração pública',
      required_fields: ['outorgante', 'outorgado', 'poderes'],
      estimated_cost: 50.00,
      processing_time: '1-2 dias úteis'
    }
  ],
  D: [
    {
      id: 'D1',
      class_id: 'D',
      name: 'Pesquisa em CPF/CNPJ',
      description: 'Pesquisa de bens e imóveis em nome de pessoa física/jurídica',
      required_fields: ['cpf_cnpj'],
      estimated_cost: 40.00,
      processing_time: '2-5 dias úteis'
    }
  ]
};