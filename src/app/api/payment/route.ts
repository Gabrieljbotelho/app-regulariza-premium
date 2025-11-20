import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const { userId, type, amount, professionalId, serviceId, metadata } = await request.json();

    if (!userId || !type || !amount) {
      return NextResponse.json(
        { error: 'userId, type e amount são obrigatórios' },
        { status: 400 }
      );
    }

    // Calcular taxa da plataforma (15%)
    const platformFee = amount * 0.15;

    // Criar transação
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        professional_id: professionalId,
        type: type,
        amount: amount,
        platform_fee: platformFee,
        status: 'pending',
        metadata: {
          ...metadata,
          service_id: serviceId
        }
      })
      .select()
      .single();

    if (txError) {
      console.error('Erro ao criar transação:', txError);
      return NextResponse.json(
        { error: 'Erro ao criar transação' },
        { status: 500 }
      );
    }

    // Log de auditoria
    await supabase.from('audit_logs').insert({
      user_id: userId,
      action: 'payment_initiated',
      entity_type: 'transaction',
      entity_id: transaction.id,
      metadata: {
        type: type,
        amount: amount,
        platform_fee: platformFee
      }
    });

    // Aqui você integraria com Stripe, Mercado Pago, etc.
    // Por enquanto, vamos simular um checkout URL
    const checkoutUrl = `/payment/checkout?transaction_id=${transaction.id}`;

    return NextResponse.json({
      success: true,
      transaction: transaction,
      checkoutUrl: checkoutUrl,
      message: 'Transação criada com sucesso. Redirecione o usuário para o checkout.'
    });

  } catch (error) {
    console.error('Erro no pagamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Webhook para processar confirmação de pagamento
export async function PUT(request: NextRequest) {
  try {
    const { transactionId, status, paymentId, paymentMethod } = await request.json();

    if (!transactionId || !status) {
      return NextResponse.json(
        { error: 'transactionId e status são obrigatórios' },
        { status: 400 }
      );
    }

    // Atualizar transação
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .update({
        status: status,
        payment_id: paymentId,
        payment_method: paymentMethod,
        completed_at: status === 'completed' ? new Date().toISOString() : null
      })
      .eq('id', transactionId)
      .select()
      .single();

    if (txError) {
      console.error('Erro ao atualizar transação:', txError);
      return NextResponse.json(
        { error: 'Erro ao atualizar transação' },
        { status: 500 }
      );
    }

    // Log de auditoria
    await supabase.from('audit_logs').insert({
      user_id: transaction.user_id,
      action: 'payment_updated',
      entity_type: 'transaction',
      entity_id: transactionId,
      metadata: {
        status: status,
        payment_id: paymentId
      }
    });

    return NextResponse.json({
      success: true,
      transaction: transaction
    });

  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
