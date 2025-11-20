'use client';

import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface KYCVerificationProps {
  userId: string;
  onComplete: () => void;
}

export default function KYCVerification({ userId, onComplete }: KYCVerificationProps) {
  const [step, setStep] = useState<'document' | 'selfie' | 'processing' | 'complete'>('document');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
      setError(null);
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfieFile(file);
      setError(null);
    }
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${folder}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('kyc')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('kyc')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!documentFile || !selfieFile) {
      setError('Por favor, envie todos os documentos necessários');
      return;
    }

    setLoading(true);
    setStep('processing');
    setError(null);

    try {
      // Upload documento
      const documentUrl = await uploadFile(documentFile, 'documents');
      
      // Upload selfie
      const selfieUrl = await uploadFile(selfieFile, 'selfies');

      // Atualizar perfil com URLs e status KYC
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          kyc_document_url: documentUrl,
          kyc_selfie_url: selfieUrl,
          kyc_status: 'submitted',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Log de auditoria
      await supabase.from('audit_logs').insert({
        user_id: userId,
        action: 'kyc_submitted',
        entity_type: 'user_profile',
        metadata: {
          document_url: documentUrl,
          selfie_url: selfieUrl
        }
      });

      setStep('complete');
      setTimeout(() => {
        onComplete();
      }, 2000);

    } catch (err) {
      console.error('Erro no KYC:', err);
      setError('Erro ao enviar documentos. Tente novamente.');
      setStep('document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a1a1a] to-[#0D0D0D] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border border-[#00FF7F]/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF7F]/10 rounded-full mb-4">
            {step === 'complete' ? (
              <CheckCircle className="w-8 h-8 text-[#00FF7F]" />
            ) : (
              <Camera className="w-8 h-8 text-[#00FF7F]" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verificação de Identidade</h1>
          <p className="text-gray-400">
            {step === 'document' && 'Envie uma foto do seu documento de identidade'}
            {step === 'selfie' && 'Agora, envie uma selfie segurando o documento'}
            {step === 'processing' && 'Processando seus documentos...'}
            {step === 'complete' && 'Verificação enviada com sucesso!'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step === 'document' ? 'text-[#00FF7F]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step !== 'document' ? 'bg-[#00FF7F]' : 'bg-[#00FF7F]/20'
            }`}>
              {step !== 'document' ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className="ml-2 text-sm">Documento</span>
          </div>
          
          <div className="w-16 h-0.5 bg-gray-700 mx-4" />
          
          <div className={`flex items-center ${step === 'selfie' || step === 'processing' || step === 'complete' ? 'text-[#00FF7F]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'processing' || step === 'complete' ? 'bg-[#00FF7F]' : 'bg-[#00FF7F]/20'
            }`}>
              {step === 'processing' || step === 'complete' ? <CheckCircle className="w-5 h-5" /> : '2'}
            </div>
            <span className="ml-2 text-sm">Selfie</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Document Upload */}
        {step === 'document' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-[#00FF7F]/50 transition-colors">
              <input
                type="file"
                id="document"
                accept="image/*,.pdf"
                onChange={handleDocumentUpload}
                className="hidden"
              />
              <label htmlFor="document" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-white mb-2">
                  {documentFile ? documentFile.name : 'Clique para enviar documento'}
                </p>
                <p className="text-sm text-gray-500">RG, CNH ou Passaporte (JPG, PNG ou PDF)</p>
              </label>
            </div>

            <button
              onClick={() => documentFile && setStep('selfie')}
              disabled={!documentFile}
              className="w-full py-4 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF7F]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Selfie Upload */}
        {step === 'selfie' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-[#00FF7F]/50 transition-colors">
              <input
                type="file"
                id="selfie"
                accept="image/*"
                onChange={handleSelfieUpload}
                className="hidden"
              />
              <label htmlFor="selfie" className="cursor-pointer">
                <Camera className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-white mb-2">
                  {selfieFile ? selfieFile.name : 'Clique para tirar selfie'}
                </p>
                <p className="text-sm text-gray-500">Segure seu documento ao lado do rosto</p>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('document')}
                className="flex-1 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selfieFile || loading}
                className="flex-1 py-4 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF7F]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Verificação'}
              </button>
            </div>
          </div>
        )}

        {/* Processing */}
        {step === 'processing' && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-[#00FF7F] mb-4" />
            <p className="text-white text-lg">Processando documentos...</p>
            <p className="text-gray-500 text-sm mt-2">Isso pode levar alguns segundos</p>
          </div>
        )}

        {/* Complete */}
        {step === 'complete' && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF7F]/10 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-[#00FF7F]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verificação Enviada!</h2>
            <p className="text-gray-400">
              Seus documentos estão em análise. Você será notificado em breve.
            </p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-sm">
            <strong>Por que precisamos disso?</strong> A verificação de identidade garante a segurança 
            de todos os usuários da plataforma e é necessária para liberar funcionalidades avançadas.
          </p>
        </div>
      </div>
    </div>
  );
}
