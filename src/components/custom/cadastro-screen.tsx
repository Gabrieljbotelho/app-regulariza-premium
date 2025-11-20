'use client';

import React, { useState } from 'react';
import { CheckCircle, User, MapPin } from 'lucide-react';

const CadastroScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    cep: '',
    via: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    estado: '',
    cidade: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const steps = [
    { label: 'Verificação', icon: CheckCircle, completed: true },
    { label: 'Dados Pessoais', icon: User, completed: true },
    { label: 'Endereço', icon: MapPin, completed: false, current: true },
  ];

  const viaOptions = ['Selecione...', 'Rua', 'Avenida', 'Praça', 'Alameda', 'Travessa'];

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cadastro</h1>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-pink-500 text-white'
                    : step.current
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                <step.icon size={20} />
              </div>
              <span
                className={`mt-2 text-sm ${
                  step.current ? 'text-blue-500 font-semibold' : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step.completed ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Preencha o formulário:</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* CEP and Via in two columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o CEP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Via</label>
              <select
                value={formData.via}
                onChange={(e) => handleInputChange('via', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {viaOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Other fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
            <input
              type="text"
              value={formData.logradouro}
              onChange={(e) => handleInputChange('logradouro', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o logradouro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="text"
              value={formData.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o número"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
            <input
              type="text"
              value={formData.bairro}
              onChange={(e) => handleInputChange('bairro', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o bairro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
            <input
              type="text"
              value={formData.complemento}
              onChange={(e) => handleInputChange('complemento', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o complemento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <input
              type="text"
              value={formData.estado}
              onChange={(e) => handleInputChange('estado', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o estado"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
            <input
              type="text"
              value={formData.cidade}
              onChange={(e) => handleInputChange('cidade', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a cidade"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <button
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-semibold ${
            isFormValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default CadastroScreen;