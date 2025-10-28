import React from 'react';
import { TransactionTemplate } from '@/components/templates/TransactionTemplate';
import { Category } from '@/components/forms/CategoryCarousel';

// Categorías para gastos
const expenseCategories: Category[] = [
  { id: 'food', name: 'Comida', icon: 'restaurant' },
  { id: 'transport', name: 'Transporte', icon: 'car' },
  { id: 'home', name: 'Hogar', icon: 'home' },
  { id: 'entertainment', name: 'Ocio', icon: 'game-controller' },
  { id: 'health', name: 'Salud', icon: 'medical' },
  { id: 'other', name: 'Otro gasto', icon: 'add-circle' },
];

export default function AddExpenseScreen() {
  const handleSubmit = (data: { amount: number; category: string; note: string }) => {
    // TODO: Implementar lógica para guardar el gasto
    console.log('Guardando gasto:', {
      ...data,
      type: 'expense'
    });
  };

  return (
    <TransactionTemplate
      type="expense"
      currency="ARS"
      categories={expenseCategories}
      onSubmit={handleSubmit}
    />
  );
}
