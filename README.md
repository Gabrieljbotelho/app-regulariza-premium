# 🏠 Marketplace de Regularização Imobiliária

Plataforma completa para regularização imobiliária com IA, conectando usuários a profissionais especializados (advogados, engenheiros, arquitetos e corretores).

## 🚀 Funcionalidades Principais

### Para Usuários Comuns
- ✅ Autenticação segura com Supabase Auth
- ✅ Verificação de identidade (KYC) com upload de documentos e selfie
- ✅ Chat inteligente com IA para triagem e orientação
- ✅ Upload e análise automática de documentos (certidões, matrículas, etc.)
- ✅ Relatórios detalhados com recomendações personalizadas
- ✅ Marketplace para contratar profissionais
- ✅ Sistema de pagamento integrado

### Para Profissionais
- ✅ Painel profissional completo
- ✅ Cadastro de serviços com preços e prazos
- ✅ Gerenciamento de solicitações de clientes
- ✅ Dashboard com estatísticas e ganhos
- ✅ Perfil público com credenciais (OAB, CREA, CRECI, CAU)

### Recursos Técnicos
- ✅ Análise de documentos com IA (GPT-4o)
- ✅ Extração automática de dados (proprietário, matrícula, averbações)
- ✅ Identificação de gravames e irregularidades
- ✅ Sistema de logs para auditoria
- ✅ Otimização de custos com modelos Fast e Pro
- ✅ Storage seguro no Supabase

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Chave da API OpenAI (opcional, para análise de documentos)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Supabase (OBRIGATÓRIO)
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role (opcional)

# OpenAI (OPCIONAL - para análise de documentos)
OPENAI_API_KEY=sua_chave_openai

# Configurações do App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configure o banco de dados Supabase:**

As tabelas já foram criadas automaticamente via SQL. Verifique no Supabase Dashboard se as seguintes tabelas existem:
- `user_profiles`
- `documents`
- `analysis_reports`
- `transactions`
- `professional_services`
- `service_requests`
- `audit_logs`

5. **Configure o Supabase Storage:**

Crie os seguintes buckets no Supabase Storage:
- `documents` (para documentos dos usuários)
- `kyc` (para documentos de verificação de identidade)

Torne os buckets públicos ou configure políticas de acesso adequadas.

## 🚀 Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

Acesse: `http://localhost:3000`

### Modo Produção
```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── ai-assistant/      # Chat com IA
│   │   ├── analyze-document/  # Análise de documentos
│   │   ├── payment/           # Sistema de pagamento
│   │   ├── profile/           # Gerenciamento de perfis
│   │   └── upload-document/   # Upload de arquivos
│   ├── layout.tsx
│   └── page.tsx               # Página principal
├── components/
│   ├── custom/
│   │   ├── ai-assistant-screen.tsx
│   │   ├── auth-screen.tsx
│   │   ├── dashboard-screen.tsx
│   │   ├── kyc-verification-screen.tsx
│   │   ├── professional-panel-screen.tsx
│   │   └── ...
│   └── ui/                    # Componentes Shadcn/UI
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   └── types.ts              # Tipos TypeScript
└── ...
```

## 🎯 Fluxo de Uso

### Para Usuários Comuns:
1. **Cadastro/Login** → Autenticação via Supabase
2. **Seleção de Perfil** → Escolher "Usuário Comum"
3. **Verificação KYC** → Upload de documento + selfie (para liberar análise)
4. **Chat com IA** → Triagem e orientação inicial
5. **Upload de Documentos** → Enviar certidões, matrículas, etc.
6. **Análise Automática** → IA extrai dados e identifica problemas
7. **Relatório** → Recomendações e profissionais necessários
8. **Marketplace** → Contratar profissionais
9. **Pagamento** → Pagar por análises ou serviços

### Para Profissionais:
1. **Cadastro/Login** → Autenticação via Supabase
2. **Seleção de Perfil** → Escolher profissão (Advogado, Engenheiro, etc.)
3. **Completar Perfil** → Adicionar credenciais (OAB, CREA, etc.)
4. **Cadastrar Serviços** → Definir serviços, preços e prazos
5. **Receber Solicitações** → Clientes solicitam serviços
6. **Gerenciar Trabalhos** → Aceitar, executar e concluir
7. **Receber Pagamentos** → Plataforma retém 15% de comissão

## 💰 Sistema de Pagamento

### Preços Padrão:
- **Análise de Documentos**: R$ 49,90
- **Consultoria**: R$ 99,90
- **Comissão da Plataforma**: 15%

### Integração:
O sistema está preparado para integração com:
- Stripe
- Mercado Pago
- PagSeguro
- Outros gateways de pagamento

Atualmente, o endpoint `/api/payment` cria transações e retorna URLs de checkout simuladas.

## 🤖 Sistema de IA

### Modelos Utilizados:
- **Fast (gpt-3.5-turbo)**: Chat de triagem e orientação
- **Pro (gpt-4o)**: Análise complexa de documentos

### Análise de Documentos:
A IA extrai automaticamente:
- Tipo de documento
- Dados do proprietário
- Dados do imóvel
- Averbações e ônus
- Gravames e irregularidades
- Documentos faltantes
- Recomendações de profissionais
- Estimativa de custos

## 📊 Logs e Auditoria

Todos os eventos críticos são registrados na tabela `audit_logs`:
- Upload de documentos
- Análise de documentos
- Pagamentos iniciados/concluídos
- Verificação KYC
- Criação de serviços
- Atualização de perfis

## 🔒 Segurança

- ✅ Autenticação via Supabase Auth
- ✅ Row Level Security (RLS) habilitado
- ✅ Variáveis de ambiente para chaves sensíveis
- ✅ Validação de uploads
- ✅ Logs de auditoria completos

## 🌐 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático a cada push

### Outras Plataformas
O projeto é compatível com qualquer plataforma que suporte Next.js 15:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage
- **IA**: OpenAI GPT-4o / GPT-3.5-turbo
- **Componentes UI**: Shadcn/UI + Radix UI
- **Ícones**: Lucide React

## 📝 Próximos Passos

- [ ] Integração completa com gateway de pagamento (Stripe/Mercado Pago)
- [ ] Sistema de notificações em tempo real
- [ ] Chat direto entre usuários e profissionais
- [ ] Sistema de avaliações e reviews
- [ ] Dashboard de analytics para profissionais
- [ ] App mobile (React Native)
- [ ] Integração com cartórios e órgãos públicos
- [ ] Sistema de agendamento de consultas
- [ ] Geração automática de contratos

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do chat de ajuda no aplicativo.

---

**Desenvolvido com ❤️ usando Lasy AI**
