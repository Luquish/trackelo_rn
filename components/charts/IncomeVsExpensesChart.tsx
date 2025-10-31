import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface MonthData {
  value: number;
  label: string;
  frontColor: string;
  spacing?: number;
  labelComponent?: () => JSX.Element;
}

interface IncomeVsExpensesChartProps {
  incomeData?: number[];
  expenseData?: number[];
  labels?: string[];
}

// Datos de ejemplo: últimos 6 meses
const defaultLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const defaultIncome = [8500, 9200, 8800, 10500, 9800, 10200];
const defaultExpenses = [6200, 5800, 6500, 7200, 6800, 7400];

export default function IncomeVsExpensesChart({
  incomeData = defaultIncome,
  expenseData = defaultExpenses,
  labels = defaultLabels
}: IncomeVsExpensesChartProps) {

  // Combinar datos para el gráfico de barras agrupadas
  const chartData: MonthData[] = [];

  for (let i = 0; i < labels.length; i++) {
    // Barra de ingresos
    chartData.push({
      value: incomeData[i],
      label: labels[i],
      frontColor: '#4ade80',
      spacing: 2,
    });

    // Barra de gastos
    chartData.push({
      value: expenseData[i],
      frontColor: '#f87171',
      spacing: i === labels.length - 1 ? 0 : 20,
    });
  }

  // Calcular totales
  const totalIncome = incomeData.reduce((sum, val) => sum + val, 0);
  const totalExpenses = expenseData.reduce((sum, val) => sum + val, 0);
  const netSavings = totalIncome - totalExpenses;

  // Formatear valores para el eje Y
  const formatYLabel = (value: string): string => {
    const num = parseFloat(value);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return `${num}`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(600)}>
      <YStack
        backgroundColor="#1a1a1a"
        borderRadius="$6"
        padding="$4"
        elevation={4}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={4}
      >
        {/* Header */}
        <XStack alignItems="center" space="$2" marginBottom="$3">
          <Ionicons name="bar-chart" size={24} color="#667eea" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Ingresos vs Gastos
          </Text>
        </XStack>

        {/* Leyenda */}
        <XStack justifyContent="center" space="$6" marginBottom="$3">
          <XStack alignItems="center" space="$2">
            <YStack width={12} height={12} borderRadius="$2" backgroundColor="#4ade80" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Ingresos
            </Text>
          </XStack>
          <XStack alignItems="center" space="$2">
            <YStack width={12} height={12} borderRadius="$2" backgroundColor="#f87171" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Gastos
            </Text>
          </XStack>
        </XStack>

        {/* Gráfico */}
        <YStack paddingVertical="$2">
          <BarChart
            data={chartData}
            height={200}
            width={320}
            barWidth={22}
            noOfSections={4}
            barBorderRadius={4}
            xAxisColor="rgba(255,255,255,0.2)"
            yAxisColor="rgba(255,255,255,0.2)"
            xAxisLabelTextStyle={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12,
            }}
            yAxisTextStyle={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12,
            }}
            formatYLabel={formatYLabel}
            spacing={20}
            initialSpacing={15}
            endSpacing={20}
            yAxisThickness={0}
            isAnimated
            animationDuration={1000}
            rulesType="solid"
            rulesColor="rgba(255,255,255,0.1)"
          />
        </YStack>

        {/* Footer con estadísticas */}
        <YStack marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" space="$2">
          {/* Total Ingresos */}
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" space="$2">
              <Ionicons name="arrow-down-circle" size={18} color="#4ade80" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                Total Ingresos
              </Text>
            </XStack>
            <Text fontSize="$4" fontWeight="600" color="#4ade80">
              ${totalIncome.toLocaleString('es-AR')}
            </Text>
          </XStack>

          {/* Total Gastos */}
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" space="$2">
              <Ionicons name="arrow-up-circle" size={18} color="#f87171" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                Total Gastos
              </Text>
            </XStack>
            <Text fontSize="$4" fontWeight="600" color="#f87171">
              ${totalExpenses.toLocaleString('es-AR')}
            </Text>
          </XStack>

          {/* Ahorro Neto */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            paddingTop="$2"
            borderTopWidth={1}
            borderTopColor="rgba(255,255,255,0.05)"
          >
            <XStack alignItems="center" space="$2">
              <Ionicons name="wallet" size={18} color="#667eea" />
              <Text fontSize="$4" color="white" fontWeight="600">
                Ahorro Neto
              </Text>
            </XStack>
            <Text
              fontSize="$5"
              fontWeight="bold"
              color={netSavings >= 0 ? "#4ade80" : "#f87171"}
            >
              ${netSavings.toLocaleString('es-AR')}
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
