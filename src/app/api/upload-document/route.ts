import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const documentType = formData.get('type') as string;
    const propertyId = formData.get('propertyId') as string | null;

    if (!file || !userId || !documentType) {
      return NextResponse.json(
        { error: 'Arquivo, userId e tipo são obrigatórios' },
        { status: 400 }
      );
    }

    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload para Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      return NextResponse.json(
        { error: 'Erro ao fazer upload do arquivo' },
        { status: 500 }
      );
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    // Salvar registro no banco
    const { data: documentData, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: userId,
        property_id: propertyId,
        name: file.name,
        type: documentType,
        file_url: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.type,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
      return NextResponse.json(
        { error: 'Erro ao salvar documento no banco' },
        { status: 500 }
      );
    }

    // Log de auditoria
    await supabase.from('audit_logs').insert({
      user_id: userId,
      action: 'document_upload',
      entity_type: 'document',
      entity_id: documentData.id,
      metadata: {
        file_name: file.name,
        file_size: file.size,
        document_type: documentType
      }
    });

    return NextResponse.json({
      success: true,
      document: documentData
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
