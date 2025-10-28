import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Animated, { SlideInRight } from 'react-native-reanimated';
import FloatingActionButton from '../../components/FloatingActionButton';
import BalanceCard from '../../components/cards/BalanceCard';
import SummaryCard from '../../components/cards/SummaryCard';
import CategoriesCard from '../../components/cards/CategoriesCard';
import RecentTransactions, { Transaction } from '../../components/lists/RecentTransactions';

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

  // Datos de transacciones recientes (placeholders)
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'expense',
      title: 'Supermercado',
      amount: 2500,
      date: 'Hoy, 14:30',
      category: 'Alimentación',
      description: 'Compra semanal de alimentos'
    },
    {
      id: '2',
      type: 'income',
      title: 'Salario',
      amount: 8500,
      date: 'Ayer, 09:00',
      category: 'Trabajo',
      description: 'Salario mensual'
    },
    {
      id: '3',
      type: 'investment',
      title: 'FCI Money Market',
      amount: 1500,
      date: 'Hace 2 días',
      category: 'Inversión',
      description: 'Aporte a fondo común'
    },
    {
      id: '4',
      type: 'expense',
      title: 'Uber',
      amount: 800,
      date: 'Hace 3 días',
      category: 'Transporte',
      description: 'Viaje al trabajo'
    },
    {
      id: '5',
      type: 'expense',
      title: 'Netflix',
      amount: 1200,
      date: 'Hace 5 días',
      category: 'Entretenimiento',
      description: 'Suscripción mensual'
    },
    {
      id: '6',
      type: 'income',
      title: 'Freelance',
      amount: 3200,
      date: 'Hace 1 semana',
      category: 'Trabajo',
      description: 'Proyecto de diseño'
    }
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={[ 'left', 'right']}>
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

          <Animated.View entering={SlideInRight.delay(700)}>
            <RecentTransactions
              transactions={recentTransactions}
              formatValue={formatValue}
            />
          </Animated.View>

        </YStack>
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <FloatingActionButton onActionPress={handleFabAction} />
    </SafeAreaView>
  );
}
