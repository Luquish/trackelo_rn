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

interface SavingsTrendChartProps {
  data?: DataPoint[];
}

// Datos de ejemplo: ahorro mensual acumulado
const defaultData: DataPoint[] = [
  { value: 2300, label: 'Ene' },
  { value: 5700, label: 'Feb' },
  { value: 8000, label: 'Mar' },
  { value: 11300, label: 'Abr' },
  { value: 14300, label: 'May' },
  { value: 17120, label: 'Jun' },
];

export default function SavingsTrendChart({ data = defaultData }: SavingsTrendChartProps) {

  // Calcular tasa de ahorro promedio mensual
  const avgMonthlySavings = data.length > 1
    ? (data[data.length - 1].value - data[0].value) / (data.length - 1)
    : 0;

  // Calcular crecimiento porcentual
  const growthRate = data.length > 1
    ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100
    : 0;

  // Formatear valores para el eje Y
  const formatYLabel = (value: string): string => {
    const num = parseFloat(value);
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num}`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(500)}>
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
          <Ionicons name="stats-chart" size={24} color="#10b981" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Tendencia de Ahorro
          </Text>
        </XStack>

        {/* Métricas destacadas */}
        <XStack justifyContent="space-around" marginBottom="$3" paddingVertical="$3" backgroundColor="rgba(16, 185, 129, 0.1)" borderRadius="$4">
          <YStack alignItems="center" space="$1">
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              Ahorro Total
            </Text>
            <Text fontSize="$5" fontWeight="bold" color="#10b981">
              ${data[data.length - 1].value.toLocaleString('es-AR')}
            </Text>
          </YStack>

          <YStack width={1} backgroundColor="rgba(255,255,255,0.2)" />

          <YStack alignItems="center" space="$1">
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              Mensual Prom.
            </Text>
            <Text fontSize="$5" fontWeight="bold" color="#10b981">
              ${avgMonthlySavings.toFixed(0).toLocaleString('es-AR')}
            </Text>
          </YStack>
        </XStack>

        {/* Gráfico */}
        <YStack paddingVertical="$2">
          <LineChart
            data={data}
            height={200}
            width={320}
            curved
            thickness={3}
            color="#10b981"
            startFillColor="rgba(16, 185, 129, 0.4)"
            endFillColor="rgba(16, 185, 129, 0.01)"
            areaChart
            hideDataPoints={false}
            dataPointsColor="#10b981"
            dataPointsRadius={6}
            dataPointsHeight={6}
            dataPointsWidth={6}
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

        {/* Footer con análisis */}
        <YStack marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" space="$3">
          {/* Crecimiento */}
          <XStack alignItems="center" justifyContent="center" space="$2">
            <Ionicons
              name={growthRate >= 0 ? "trending-up" : "trending-down"}
              size={20}
              color={growthRate >= 0 ? "#10b981" : "#f87171"}
            />
            <Text fontSize="$4" color={growthRate >= 0 ? "#10b981" : "#f87171"} fontWeight="600">
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </Text>
            <Text fontSize="$3" color="rgba(255,255,255,0.6)">
              de crecimiento
            </Text>
          </XStack>

          {/* Proyección */}
          <YStack
            padding="$3"
            backgroundColor="rgba(102, 126, 234, 0.1)"
            borderRadius="$4"
            borderWidth={1}
            borderColor="rgba(102, 126, 234, 0.3)"
          >
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" space="$2">
                <Ionicons name="bulb" size={18} color="#667eea" />
                <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                  Proyección 6 meses
                </Text>
              </XStack>
              <Text fontSize="$4" color="#667eea" fontWeight="bold">
                ${(data[data.length - 1].value + (avgMonthlySavings * 6)).toFixed(0).toLocaleString('es-AR')}
              </Text>
            </XStack>
          </YStack>

          {/* Objetivo motivacional */}
          <XStack alignItems="center" justifyContent="center" space="$2" paddingTop="$2">
            <Ionicons name="trophy" size={16} color="#f59e0b" />
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              {avgMonthlySavings > 2000
                ? "¡Excelente ritmo de ahorro!"
                : "Sigue así, cada paso cuenta"}
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
