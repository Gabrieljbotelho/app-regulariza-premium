import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(request: NextRequest) {
  try {
    const { documentId, userId } = await request.json();

    if (!documentId || !userId) {
      return NextResponse.json(
        { error: 'documentId e userId são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar documento
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single();

    if (docError || !document) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar status para "analyzing"
    await supabase
      .from('documents')
      .update({ status: 'analyzing' })
      .eq('id', documentId);

    // Análise com IA (modelo Pro para análise complexa)
    const analysisPrompt = `
Você é um especialista em regularização imobiliária. Analise o documento fornecido e extraia as seguintes informações:

1. Tipo de documento (matrícula, certidão, contrato, etc.)
2. Dados do proprietário (nome, CPF/CNPJ)
3. Dados do imóvel (endereço, matrícula, área)
4. Averbações e ônus registrados
5. Possíveis gravames ou irregularidades
6. Status de regularização
7. Documentos complementares necessários
8. Recomendações de profissionais (advogado, engenheiro, corretor)
9. Estimativa de custo para regularização

Retorne a análise em formato JSON estruturado.

Documento: ${document.name}
Tipo: ${document.type}
URL: ${document.file_url}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Modelo Pro para análise complexa
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em análise de documentos imobiliários e regularização.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const analysisResult = JSON.parse(completion.choices[0].message.content || '{}');

    // Atualizar documento com resultado
    await supabase
      .from('documents')
      .update({
        status: 'analyzed',
        analysis_result: analysisResult
      })
      .eq('id', documentId);

    // Criar relatório de análise
    const { data: report } = await supabase
      .from('analysis_reports')
      .insert({
        user_id: userId,
        document_ids: [documentId],
        analysis_type: document.type,
        result: analysisResult,
        recommendations: analysisResult.recommendations || [],
        required_professionals: analysisResult.required_professionals || [],
        missing_documents: analysisResult.missing_documents || [],
        estimated_cost: analysisResult.estimated_cost || 0
      })
      .select()
      .single();

    // Log de auditoria
    await supabase.from('audit_logs').insert({
      user_id: userId,
      action: 'document_analysis',
      entity_type: 'document',
      entity_id: documentId,
      metadata: {
        document_type: document.type,
        analysis_completed: true
      }
    });

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      report: report
    });

  } catch (error) {
    console.error('Erro na análise:', error);
    
    // Atualizar status para erro
    const { documentId } = await request.json();
    if (documentId) {
      await supabase
        .from('documents')
        .update({ status: 'error' })
        .eq('id', documentId);
    }

    return NextResponse.json(
      { error: 'Erro ao analisar documento' },
      { status: 500 }
    );
  }
}
