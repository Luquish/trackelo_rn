import React from 'react';
import { TransactionTemplate } from '@/components/templates/TransactionTemplate';
import { Category } from '@/components/forms/CategoryCarousel';

// Categorías para inversiones
const investmentCategories: Category[] = [
  { id: 'broker', name: 'Broker local', icon: 'business' },
  { id: 'etf', name: 'ETF internacional', icon: 'globe' },
  { id: 'crypto', name: 'Exchange cripto', icon: 'logo-bitcoin' },
  { id: 'fund', name: 'Fondo común', icon: 'layers' },
];

export default function AddInvestmentScreen() {
  const handleSubmit = (data: { amount: number; category: string; note: string }) => {
    // TODO: Implementar lógica para guardar la inversión
    console.log('Guardando inversión:', {
      ...data,
      type: 'investment'
    });
  };

  return (
    <TransactionTemplate
      type="investment"
      currency="ARS"
      categories={investmentCategories}
      onSubmit={handleSubmit}
    />
  );
}
