import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// GET - Buscar perfil profissional
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const profileType = searchParams.get('profileType');

    let query = supabase.from('user_profiles').select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (profileType) {
      query = query.eq('profile_type', profileType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar perfis:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar perfis' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profiles: data
    });

  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar/atualizar perfil profissional
export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json();

    if (!profileData.user_id || !profileData.profile_type || !profileData.full_name) {
      return NextResponse.json(
        { error: 'user_id, profile_type e full_name são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se perfil já existe
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', profileData.user_id)
      .single();

    let result;

    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', profileData.user_id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        return NextResponse.json(
          { error: 'Erro ao atualizar perfil' },
          { status: 500 }
        );
      }

      result = data;

      // Log de auditoria
      await supabase.from('audit_logs').insert({
        user_id: profileData.user_id,
        action: 'profile_updated',
        entity_type: 'user_profile',
        entity_id: result.id,
        metadata: profileData
      });

    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar perfil:', error);
        return NextResponse.json(
          { error: 'Erro ao criar perfil' },
          { status: 500 }
        );
      }

      result = data;

      // Log de auditoria
      await supabase.from('audit_logs').insert({
        user_id: profileData.user_id,
        action: 'profile_created',
        entity_type: 'user_profile',
        entity_id: result.id,
        metadata: profileData
      });
    }

    return NextResponse.json({
      success: true,
      profile: result
    });

  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
