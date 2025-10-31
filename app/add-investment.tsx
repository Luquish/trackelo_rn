import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { TransactionTemplate } from '@/components/templates/TransactionTemplate';
import { Category } from '@/components/forms/CategoryCarousel';
import { useCreateInvestment } from '../hooks/useInvestments';
import { useInvestmentAccounts } from '../hooks/useInvestmentAccounts';

export default function AddInvestmentScreen() {
  const router = useRouter();
  const { mutate: createInvestment, isPending } = useCreateInvestment();
  const { data: accountsData } = useInvestmentAccounts();

  // Map investment accounts to categories format
  const investmentCategories: Category[] = useMemo(() => {
    if (!accountsData || accountsData.length === 0) {
      return [
        { id: 'temp', name: 'Cargando...', icon: 'add-circle' },
      ];
    }

    return accountsData.map((account: any) => ({
      id: account.id,
      name: account.name,
      icon: account.type === 'crypto' ? 'logo-bitcoin' :
        account.type === 'brokerage' ? 'business' :
          account.type === 'savings' ? 'cash' : 'layers',
    }));
  }, [accountsData]);

  const handleSubmit = (data: { amount: number; category: string; note: string }) => {
    createInvestment(
      {
        account_id: data.category, // category here is the account_id
        amount_minor: Math.round(data.amount * 100), // Convert to cents
        kind: 'contribution',
        note: data.note || null,
        occurred_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          Alert.alert('Éxito', 'Inversión guardada correctamente');
          router.back();
        },
        onError: (error) => {
          Alert.alert('Error', `No se pudo guardar la inversión: ${error.message}`);
        },
      }
    );
  };

  return (
    <TransactionTemplate
      type="investment"
      currency="ARS"
      categories={investmentCategories}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
