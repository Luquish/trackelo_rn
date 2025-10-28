import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import FloatingActionButton from '../../components/FloatingActionButton';
import BalanceCard from '../../components/cards/BalanceCard';
import SummaryCard from '../../components/cards/SummaryCard';
import CategoriesCard from '../../components/cards/CategoriesCard';

// Tipo para datos financieros
interface BalanceData {
  netBalance: number;
  income: number;
  expenses: number;
  investment: number;
}

// Función para formatear moneda
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function BalanceScreen() {
  // Estado para controlar la visibilidad de los valores
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Datos simulados - en producción vendrían de una API
  const balanceData: BalanceData = {
    netBalance: 15420.50,
    income: 8500.00,
    expenses: 3200.00,
    investment: 1500.00,
  };

  // Datos de categorías
  const categories = [
    { name: 'Alimentación', icon: 'restaurant' as const, iconColor: '#f59e0b', amount: 1200 },
    { name: 'Transporte', icon: 'car' as const, iconColor: '#3b82f6', amount: 800 },
    { name: 'Hogar', icon: 'home' as const, iconColor: '#10b981', amount: 1200 },
  ];

  // Función para formatear valores con asteriscos cuando están ocultos
  const formatValue = (amount: number): string => {
    if (isBalanceVisible) {
      return formatCurrency(amount);
    }
    return '$ ••••••';
  };

  // Función para manejar las acciones del FAB
  const handleFabAction = (type: 'expense' | 'investment' | 'income') => {
    // TODO: Aquí irá la navegación a la pantalla correspondiente
    console.log(`Acción seleccionada: ${type}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" space="$4">

          <BalanceCard
            balanceData={balanceData}
            isBalanceVisible={isBalanceVisible}
            onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
            formatValue={formatValue}
          />

          <SummaryCard
            totalTransactions={24}
            monthlySavings={formatValue(balanceData.income - balanceData.expenses)}
            formatValue={formatValue}
          />

          <CategoriesCard
            categories={categories}
            formatValue={formatValue}
          />

        </YStack>
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <FloatingActionButton onActionPress={handleFabAction} />
    </SafeAreaView>
  );
}
