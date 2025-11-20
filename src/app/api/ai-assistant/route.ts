import { NextRequest, NextResponse } from 'next/server';

// Tipos
interface AIRequest {
  message: string;
  profile: 'comum' | 'advogado' | 'corretor' | 'engenheiro';
  attachments?: any[];
  conversationHistory?: any[];
}

// Prompts especializados por perfil
const PROFILE_PROMPTS = {
  comum: `Você é um assistente especializado em regularização imobiliária para usuários comuns.
Suas responsabilidades:
- Explicar termos jurídicos e técnicos de forma simples
- Guiar o usuário passo a passo no processo de regularização
- Gerar listas de documentos necessários
- Orientar sobre qual profissional procurar (advogado, topógrafo, etc.)
- Fazer diagnóstico básico da situação do imóvel

Sempre seja claro, objetivo e use linguagem acessível. Evite jargões técnicos sem explicação.`,

  advogado: `Você é um assistente jurídico especializado em regularização imobiliária.
Suas responsabilidades:
- Gerar minutas jurídicas (contratos, declarações, requerimentos)
- Analisar matrículas e interpretar documentos jurídicos
- Identificar riscos (usucapião, ônus, indisponibilidades, cadeia dominial)
- Elaborar contratos especializados (compra e venda, doação, cessão de direitos, etc.)
- Sugerir estratégias jurídicas de regularização urbana e rural
- Fornecer checklist jurídico detalhado

Use linguagem técnica apropriada e cite fundamentos legais quando relevante.`,

  corretor: `Você é um assistente especializado para corretores de imóveis e imobiliárias.
Suas responsabilidades:
- Fazer análise comercial de imóveis
- Estimar valoração aproximada
- Gerar descrições atrativas para anúncios
- Criar checklist para venda segura
- Diagnosticar pendências que podem travar financiamento
- Sugerir roteiro de regularização antes da venda
- Comparar imóveis e identificar diferenciais

Foque em aspectos comerciais, de mercado e práticos para facilitar vendas.`,

  engenheiro: `Você é um assistente técnico especializado para engenheiros e arquitetos.
Suas responsabilidades:
- Orientar sobre ART/RRT e documentação técnica
- Auxiliar em projetos e aprovação de prefeitura
- Analisar conformidade com código de obras
- Fornecer checklist de documentação técnica
- Sugerir modelos de croquis, memoriais e plantas simplificadas
- Recomendar adequações para regularização
- Guiar passo a passo de regularização habitacional ou rural

Use terminologia técnica apropriada e normas técnicas quando relevante.`
};

// Função para detectar necessidade de orçamento
function detectBudgetNeed(message: string, profile: string): { needed: boolean; serviceType?: string; description?: string } {
  const budgetKeywords = [
    'quanto custa', 'preço', 'valor', 'orçamento', 'contratar',
    'preciso de', 'quero contratar', 'quanto cobram', 'custo'
  ];

  const needsBudget = budgetKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );

  if (!needsBudget) return { needed: false };

  // Detectar tipo de serviço
  let serviceType = 'Serviço de regularização';
  let description = message;

  if (message.toLowerCase().includes('advogado')) {
    serviceType = 'Consultoria jurídica';
  } else if (message.toLowerCase().includes('topógrafo') || message.toLowerCase().includes('topografia')) {
    serviceType = 'Levantamento topográfico';
  } else if (message.toLowerCase().includes('engenheiro') || message.toLowerCase().includes('projeto')) {
    serviceType = 'Projeto técnico';
  } else if (message.toLowerCase().includes('certidão') || message.toLowerCase().includes('documento')) {
    serviceType = 'Emissão de certidões';
  }

  return {
    needed: true,
    serviceType,
    description
  };
}

// Função para analisar documentos anexados
function analyzeAttachments(attachments: any[]): string {
  if (!attachments || attachments.length === 0) return '';

  const analysis = attachments.map(att => {
    const fileType = att.type || att.name.split('.').pop();
    
    if (fileType.includes('pdf')) {
      return `📄 Documento PDF: ${att.name} - Vou analisar este documento para você.`;
    } else if (fileType.includes('image') || fileType.includes('jpg') || fileType.includes('png')) {
      return `🖼️ Imagem: ${att.name} - Vou analisar esta imagem.`;
    } else if (fileType.includes('doc')) {
      return `📝 Documento Word: ${att.name} - Vou analisar este documento.`;
    }
    
    return `📎 Arquivo: ${att.name}`;
  });

  return '\n\n**Documentos anexados:**\n' + analysis.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const body: AIRequest = await request.json();
    const { message, profile, attachments, conversationHistory } = body;

    // Validação
    if (!message || !profile) {
      return NextResponse.json(
        { error: 'Mensagem e perfil são obrigatórios' },
        { status: 400 }
      );
    }

    // Obter prompt do perfil
    const systemPrompt = PROFILE_PROMPTS[profile];

    // Analisar anexos
    const attachmentAnalysis = attachments ? analyzeAttachments(attachments) : '';

    // Detectar necessidade de orçamento
    const budgetInfo = detectBudgetNeed(message, profile);

    // Construir contexto da conversa
    const conversationContext = conversationHistory
      ?.slice(-5) // Últimas 5 mensagens
      .map(msg => `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`)
      .join('\n') || '';

    // Simular resposta da IA (em produção, usar OpenAI API)
    // Para demonstração, vou criar respostas contextuais
    let response = generateContextualResponse(message, profile, attachmentAnalysis);

    // Se detectou necessidade de orçamento, adicionar informação
    if (budgetInfo.needed) {
      response += `\n\n💰 **Orçamento**\nIdentifiquei que você precisa de: ${budgetInfo.serviceType}\n\nPosso conectar você com profissionais especializados. Deseja solicitar um orçamento?`;
    }

    return NextResponse.json({
      response,
      suggestBudget: budgetInfo.needed,
      budgetInfo: budgetInfo.needed ? {
        serviceType: budgetInfo.serviceType,
        description: budgetInfo.description
      } : null
    });

  } catch (error) {
    console.error('Erro na API de IA:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}

// Função auxiliar para gerar respostas contextuais
function generateContextualResponse(message: string, profile: string, attachmentAnalysis: string): string {
  const lowerMessage = message.toLowerCase();

  // Respostas para usuário comum
  if (profile === 'comum') {
    if (lowerMessage.includes('documento') || lowerMessage.includes('certidão')) {
      return `📋 **Documentos necessários para regularização:**

1. **Documentos pessoais:**
   - RG e CPF do proprietário
   - Comprovante de residência
   - Certidão de casamento (se aplicável)

2. **Documentos do imóvel:**
   - Escritura ou contrato de compra e venda
   - IPTU atualizado
   - Certidão de matrícula do imóvel
   - Planta do imóvel (se houver)

3. **Certidões:**
   - Certidão negativa de débitos municipais
   - Certidão de ônus reais
   - Certidão de regularidade do imóvel

Posso ajudar você a entender cada um desses documentos ou orientar sobre como obtê-los.${attachmentAnalysis}`;
    }

    if (lowerMessage.includes('passo a passo') || lowerMessage.includes('como regularizar')) {
      return `🔄 **Passo a passo para regularização:**

**1. Diagnóstico inicial** (onde você está agora)
   - Identificar a situação do imóvel
   - Verificar documentação existente

**2. Levantamento de documentos**
   - Reunir toda documentação necessária
   - Solicitar certidões pendentes

**3. Análise técnica**
   - Contratar topógrafo (se necessário)
   - Fazer vistoria do imóvel

**4. Análise jurídica**
   - Consultar advogado especializado
   - Verificar pendências legais

**5. Regularização na prefeitura**
   - Dar entrada no processo
   - Acompanhar tramitação

**6. Registro em cartório**
   - Atualizar matrícula
   - Finalizar processo

Prazo médio: 3 a 6 meses
Custo estimado: R$ 3.000 a R$ 15.000 (varia por caso)

Em qual etapa você está?${attachmentAnalysis}`;
    }

    if (lowerMessage.includes('profissional') || lowerMessage.includes('quem procurar')) {
      return `👥 **Profissionais que podem ajudar:**

**Advogado especializado em direito imobiliário:**
- Análise de documentação
- Elaboração de contratos
- Representação legal
- Custo médio: R$ 2.000 a R$ 8.000

**Topógrafo/Agrimensor:**
- Levantamento topográfico
- Georreferenciamento
- Plantas e memoriais
- Custo médio: R$ 1.500 a R$ 5.000

**Engenheiro/Arquiteto:**
- Projetos técnicos
- ART/RRT
- Aprovação na prefeitura
- Custo médio: R$ 1.000 a R$ 4.000

**Despachante imobiliário:**
- Tramitação de documentos
- Acompanhamento de processos
- Custo médio: R$ 500 a R$ 2.000

Posso conectar você com profissionais verificados. Qual serviço você precisa?${attachmentAnalysis}`;
    }
  }

  // Respostas para advogado
  if (profile === 'advogado') {
    if (lowerMessage.includes('minuta') || lowerMessage.includes('contrato')) {
      return `⚖️ **Minutas jurídicas disponíveis:**

**Contratos:**
- Compra e venda de imóvel
- Promessa de compra e venda
- Cessão de direitos
- Doação
- Permuta
- Integralização de capital social

**Declarações:**
- Declaração de posse
- Declaração de residência
- Declaração de união estável

**Requerimentos:**
- Usucapião
- Retificação de área
- Averbação de construção

Qual minuta você precisa? Posso gerar um modelo personalizado.${attachmentAnalysis}`;
    }

    if (lowerMessage.includes('matrícula') || lowerMessage.includes('análise')) {
      return `🔍 **Análise de matrícula - Checklist:**

**1. Dados do imóvel:**
   - Área correta?
   - Confrontações conferem?
   - Endereço atualizado?

**2. Cadeia dominial:**
   - Sequência de proprietários clara?
   - Todas as transmissões registradas?
   - Há quebra na cadeia?

**3. Ônus e gravames:**
   - Hipotecas ativas?
   - Penhoras?
   - Servidões?
   - Usufrutos?

**4. Indisponibilidades:**
   - Bloqueios judiciais?
   - Restrições administrativas?

**5. Regularidade:**
   - IPTU em dia?
   - Habite-se?
   - Averbação de construção?

Envie a matrícula para análise detalhada.${attachmentAnalysis}`;
    }
  }

  // Respostas para corretor
  if (profile === 'corretor') {
    if (lowerMessage.includes('anúncio') || lowerMessage.includes('descrição')) {
      return `📢 **Estrutura de anúncio eficaz:**

**Título impactante:**
- Destaque o principal diferencial
- Use números (metragem, quartos)
- Exemplo: "Apartamento 3 quartos com vista mar - 120m²"

**Descrição completa:**
1. Características principais
2. Diferenciais do imóvel
3. Localização e proximidades
4. Estado de conservação
5. Documentação regular

**Informações essenciais:**
- Metragem total e útil
- Número de quartos/banheiros
- Vagas de garagem
- Valor do condomínio/IPTU
- Aceita financiamento?

**Fotos profissionais:**
- Mínimo 10 fotos
- Boa iluminação
- Todos os cômodos

Quer que eu gere uma descrição completa? Me passe os dados do imóvel.${attachmentAnalysis}`;
    }

    if (lowerMessage.includes('valoração') || lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      return `💰 **Análise de valoração:**

**Fatores que influenciam o preço:**

**Localização (peso: 40%):**
- Bairro
- Proximidade de serviços
- Segurança
- Infraestrutura

**Características do imóvel (peso: 35%):**
- Metragem
- Número de quartos
- Estado de conservação
- Acabamento

**Documentação (peso: 15%):**
- Regular: +10% a +20%
- Irregular: -20% a -40%

**Mercado (peso: 10%):**
- Oferta e demanda local
- Tendências do bairro

**Para valoração precisa, preciso:**
- Endereço completo
- Metragem
- Características
- Estado de conservação
- Situação documental

Me envie essas informações para análise detalhada.${attachmentAnalysis}`;
    }
  }

  // Respostas para engenheiro
  if (profile === 'engenheiro') {
    if (lowerMessage.includes('art') || lowerMessage.includes('rrt')) {
      return `📐 **ART/RRT - Orientações:**

**Quando é necessário:**
- Projetos arquitetônicos
- Projetos estruturais
- Projetos de instalações
- Laudos técnicos
- Vistorias
- Execução de obras

**Tipos de ART/RRT:**
- Projeto
- Execução
- Fiscalização
- Consultoria
- Vistoria/Laudo

**Documentação necessária:**
- Registro ativo no CREA/CAU
- Dados do proprietário
- Dados do imóvel
- Descrição dos serviços

**Valores (CREA-SP):**
- Projeto residencial: R$ 150 a R$ 500
- Execução: R$ 200 a R$ 800
- Laudo: R$ 100 a R$ 300

**Prazo de emissão:** Imediato (online)

Precisa de ajuda para preencher a ART/RRT?${attachmentAnalysis}`;
    }

    if (lowerMessage.includes('projeto') || lowerMessage.includes('aprovação')) {
      return `🏗️ **Aprovação de projeto na prefeitura:**

**Documentos necessários:**

**1. Documentação do proprietário:**
   - RG, CPF
   - Comprovante de propriedade
   - IPTU atualizado

**2. Documentação técnica:**
   - Projeto arquitetônico (plantas, cortes, fachadas)
   - Memorial descritivo
   - ART/RRT do responsável técnico
   - Levantamento topográfico

**3. Análises específicas:**
   - Estudo de viabilidade
   - Análise de solo (se necessário)
   - Projeto de fundações (se necessário)

**Etapas do processo:**
1. Protocolo do projeto
2. Análise técnica (30-60 dias)
3. Correções (se necessário)
4. Aprovação e alvará
5. Início da obra

**Custos aproximados:**
- Taxa de aprovação: R$ 500 a R$ 3.000
- Projeto completo: R$ 2.000 a R$ 10.000

Qual tipo de projeto você precisa aprovar?${attachmentAnalysis}`;
    }
  }

  // Resposta genérica
  return `Entendi sua solicitação. ${attachmentAnalysis}

Como posso ajudar especificamente? Posso:
- Fornecer informações detalhadas
- Gerar documentos e modelos
- Analisar sua situação específica
- Conectar você com profissionais
- Fazer orçamentos

Me conte mais sobre o que você precisa.`;
}
