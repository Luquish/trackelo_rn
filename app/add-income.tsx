import React from 'react';
import { TransactionTemplate } from '@/components/templates/TransactionTemplate';
import { Category } from '@/components/forms/CategoryCarousel';

// Categorías para ingresos
const incomeCategories: Category[] = [
  { id: 'salary', name: 'Salario', icon: 'briefcase' },
  { id: 'debt', name: 'Deuda', icon: 'cash' },
  { id: 'transfer', name: 'Transferencia', icon: 'swap-horizontal' },
  { id: 'sale', name: 'Venta', icon: 'cart' },
  { id: 'other', name: 'Otro ingreso', icon: 'add-circle' },
];

export default function AddIncomeScreen() {
  const handleSubmit = (data: { amount: number; category: string; note: string }) => {
    // TODO: Implementar lógica para guardar el ingreso
    console.log('Guardando ingreso:', {
      ...data,
      type: 'income'
    });
  };

  return (
    <TransactionTemplate
      type="income"
      currency="ARS"
      categories={incomeCategories}
      onSubmit={handleSubmit}
    />
  );
}
