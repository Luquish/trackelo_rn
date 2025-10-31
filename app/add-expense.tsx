import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { TransactionTemplate } from '@/components/templates/TransactionTemplate';
import { Category } from '@/components/forms/CategoryCarousel';
import { useCreateExpense } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';

export default function AddExpenseScreen() {
  const router = useRouter();
  const { mutate: createExpense, isPending } = useCreateExpense();
  const { data: categoriesData } = useCategories('expense');

  // Map categories from Supabase to the format expected by CategoryCarousel
  const expenseCategories: Category[] = useMemo(() => {
    if (!categoriesData) {
      return [
        { id: 'temp', name: 'Cargando...', icon: 'add-circle' },
      ];
    }

    return categoriesData.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: 'restaurant', // You can map emojis to icons here
    }));
  }, [categoriesData]);

  const handleSubmit = (data: { amount: number; category: string; note: string }) => {
    createExpense(
      {
        amount_minor: Math.round(data.amount * 100), // Convert to cents
        category_id: data.category,
        currency_code: 'ARS',
        kind: 'expense',
        note: data.note || null,
        occurred_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          Alert.alert('Éxito', 'Gasto guardado correctamente');
          router.back();
        },
        onError: (error) => {
          Alert.alert('Error', `No se pudo guardar el gasto: ${error.message}`);
        },
      }
    );
  };

  return (
    <TransactionTemplate
      type="expense"
      currency="ARS"
      categories={expenseCategories}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
