import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { TransactionTemplate } from '@/components/templates/TransactionTemplate';
import { Category } from '@/components/forms/CategoryCarousel';
import { useCreateExpense } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';

export default function AddIncomeScreen() {
  const router = useRouter();
  const { mutate: createIncome, isPending } = useCreateExpense();
  const { data: categoriesData } = useCategories('income');

  // Map categories from Supabase to the format expected by CategoryCarousel
  const incomeCategories: Category[] = useMemo(() => {
    if (!categoriesData) {
      return [
        { id: 'temp', name: 'Cargando...', icon: 'add-circle' },
      ];
    }

    return categoriesData.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: 'briefcase', // You can map emojis to icons here
    }));
  }, [categoriesData]);

  const handleSubmit = (data: { amount: number; category: string; note: string }) => {
    createIncome(
      {
        amount_minor: Math.round(data.amount * 100), // Convert to cents
        category_id: data.category,
        currency_code: 'ARS',
        kind: 'income',
        note: data.note || null,
        occurred_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          Alert.alert('Éxito', 'Ingreso guardado correctamente');
          router.back();
        },
        onError: (error) => {
          Alert.alert('Error', `No se pudo guardar el ingreso: ${error.message}`);
        },
      }
    );
  };

  return (
    <TransactionTemplate
      type="income"
      currency="ARS"
      categories={incomeCategories}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
