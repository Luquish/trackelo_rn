import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import Animated, { SlideInRight } from 'react-native-reanimated';
import FloatingActionButton from '../../components/FloatingActionButton';
import BalanceCard from '../../components/cards/BalanceCard';
import SummaryCard from '../../components/cards/SummaryCard';
import CategoriesCard from '../../components/cards/CategoriesCard';
import RecentTransactions, { Transaction } from '../../components/lists/RecentTransactions';
import { useBalance } from '../../hooks/useBalance';
import { useExpenses } from '../../hooks/useExpenses';
import { useCategories } from '../../hooks/useCategories';

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
  const router = useRouter();
  // Estado para controlar la visibilidad de los valores
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Get current month's date range
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }, []);

  // Fetch data from Supabase
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance(startDate, endDate);
  const { data: expensesData, isLoading: isExpensesLoading } = useExpenses(startDate, endDate);
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories('expense');

  // Calculate category totals
  const categories = useMemo(() => {
    if (!categoriesData || !expensesData) return [];

    const categoryTotals = new Map<string, { name: string; emoji: string | null; amount: number }>();

    expensesData.forEach((expense: any) => {
      if (expense.kind === 'expense' && expense.category) {
        const current = categoryTotals.get(expense.category_id) || {
          name: expense.category.name,
          emoji: expense.category.emoji,
          amount: 0,
        };
        current.amount += expense.amount_minor / 100;
        categoryTotals.set(expense.category_id, current);
      }
    });

    return Array.from(categoryTotals.values())
      .map((cat) => ({
        name: cat.name,
        icon: 'restaurant' as const, // Default icon
        iconColor: '#f59e0b',
        amount: cat.amount,
      }))
      .slice(0, 3); // Top 3 categories
  }, [categoriesData, expensesData]);

  // Format transactions for display
  const recentTransactions: Transaction[] = useMemo(() => {
    if (!expensesData) return [];

    return expensesData.slice(0, 6).map((expense: any) => ({
      id: expense.id,
      type: expense.kind,
      title: expense.category?.name || 'Sin categoría',
      amount: expense.amount_minor / 100,
      date: new Date(expense.occurred_at).toLocaleString('es-AR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      category: expense.category?.name || 'Sin categoría',
      description: expense.note || '',
    }));
  }, [expensesData]);

  // Función para formatear valores con asteriscos cuando están ocultos
  const formatValue = (amount: number): string => {
    if (isBalanceVisible) {
      return formatCurrency(amount);
    }
    return '$ ••••••';
  };

  // Función para manejar las acciones del FAB
  const handleFabAction = (type: 'expense' | 'investment' | 'income') => {
    switch (type) {
      case 'income':
        router.push('/add-income');
        break;
      case 'expense':
        router.push('/add-expense');
        break;
      case 'investment':
        router.push('/add-investment');
        break;
      default:
        console.log(`Tipo de acción no reconocido: ${type}`);
    }
  };

  // Show loading state
  if (isBalanceLoading || isExpensesLoading || isCategoriesLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['left', 'right']}>
        <YStack flex={1} alignItems="center" justifyContent="center">
          {/* You can add a loading spinner here */}
        </YStack>
      </SafeAreaView>
    );
  }

  // Use default values if data is not loaded
  const balance: BalanceData = balanceData || {
    netBalance: 0,
    income: 0,
    expenses: 0,
    investment: 0,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" space="$4">

          <BalanceCard
            balanceData={balance}
            isBalanceVisible={isBalanceVisible}
            onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
            formatValue={formatValue}
          />

          <SummaryCard
            totalTransactions={recentTransactions.length}
            monthlySavings={formatValue(balance.income - balance.expenses)}
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
