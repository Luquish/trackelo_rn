import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LineChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface DataPoint {
  value: number;
  label: string;
  dataPointText?: string;
}

interface CashFlowAreaChartProps {
  incomeData?: DataPoint[];
  expenseData?: DataPoint[];
}

// Datos de ejemplo: flujo de efectivo mensual
const defaultIncomeData: DataPoint[] = [
  { value: 8500, label: 'Ene' },
  { value: 9200, label: 'Feb' },
  { value: 8800, label: 'Mar' },
  { value: 10500, label: 'Abr' },
  { value: 9800, label: 'May' },
  { value: 10200, label: 'Jun' },
];

const defaultExpenseData: DataPoint[] = [
  { value: 6200, label: 'Ene' },
  { value: 5800, label: 'Feb' },
  { value: 6500, label: 'Mar' },
  { value: 7200, label: 'Abr' },
  { value: 6800, label: 'May' },
  { value: 7400, label: 'Jun' },
];

export default function CashFlowAreaChart({
  incomeData = defaultIncomeData,
  expenseData = defaultExpenseData
}: CashFlowAreaChartProps) {

  // Calcular promedio de flujo positivo
  const avgIncome = incomeData.reduce((sum, item) => sum + item.value, 0) / incomeData.length;
  const avgExpense = expenseData.reduce((sum, item) => sum + item.value, 0) / expenseData.length;

  // Formatear valores para el eje Y
  const formatYLabel = (value: string): string => {
    const num = parseFloat(value);
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num}`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(300)}>
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
          <Ionicons name="water" size={24} color="#60a5fa" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Flujo de Efectivo
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
          <LineChart
            data={incomeData}
            data2={expenseData}
            height={220}
            width={320}
            curved
            thickness={3}
            color="#4ade80"
            color2="#f87171"
            startFillColor="rgba(74, 222, 128, 0.3)"
            endFillColor="rgba(74, 222, 128, 0.01)"
            startFillColor2="rgba(248, 113, 113, 0.3)"
            endFillColor2="rgba(248, 113, 113, 0.01)"
            areaChart
            hideDataPoints={false}
            dataPointsColor="#4ade80"
            dataPointsColor2="#f87171"
            dataPointsRadius={5}
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
            spacing={50}
            initialSpacing={10}
            endSpacing={20}
            noOfSections={4}
            yAxisThickness={0}
            rulesType="solid"
            rulesColor="rgba(255,255,255,0.1)"
            animateOnDataChange
            animationDuration={1000}
          />
        </YStack>

        {/* Footer con estadísticas */}
        <YStack marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" space="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Promedio Ingresos
            </Text>
            <Text fontSize="$4" fontWeight="600" color="#4ade80">
              ${avgIncome.toFixed(0).toLocaleString('es-AR')}
            </Text>
          </XStack>

          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Promedio Gastos
            </Text>
            <Text fontSize="$4" fontWeight="600" color="#f87171">
              ${avgExpense.toFixed(0).toLocaleString('es-AR')}
            </Text>
          </XStack>

          <XStack
            justifyContent="space-between"
            alignItems="center"
            paddingTop="$2"
            borderTopWidth={1}
            borderTopColor="rgba(255,255,255,0.05)"
          >
            <XStack alignItems="center" space="$2">
              <Ionicons name="trending-up" size={18} color="#60a5fa" />
              <Text fontSize="$4" color="white" fontWeight="600">
                Flujo Promedio
              </Text>
            </XStack>
            <Text fontSize="$5" fontWeight="bold" color="#60a5fa">
              ${(avgIncome - avgExpense).toFixed(0).toLocaleString('es-AR')}
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
