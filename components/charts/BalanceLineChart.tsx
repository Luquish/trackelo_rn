import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LineChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface DataPoint {
  value: number;
  label: string;
  labelTextStyle?: any;
}

interface BalanceLineChartProps {
  data?: DataPoint[];
}

// Datos de ejemplo: evolución del balance en los últimos 6 meses
const defaultData: DataPoint[] = [
  { value: 8500, label: 'Ene' },
  { value: 10200, label: 'Feb' },
  { value: 9800, label: 'Mar' },
  { value: 12400, label: 'Abr' },
  { value: 13200, label: 'May' },
  { value: 15420, label: 'Jun' },
];

export default function BalanceLineChart({ data = defaultData }: BalanceLineChartProps) {
  // Formatear valores para el eje Y
  const formatYLabel = (value: string): string => {
    const num = parseFloat(value);
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num}`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(400)}>
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
          <Ionicons name="trending-up" size={24} color="#667eea" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Evolución del Balance
          </Text>
        </XStack>

        {/* Gráfico */}
        <YStack paddingVertical="$2">
          <LineChart
            data={data}
            height={200}
            width={320}
            curved
            thickness={3}
            color="#667eea"
            startFillColor="rgba(102, 126, 234, 0.3)"
            endFillColor="rgba(102, 126, 234, 0.01)"
            areaChart
            hideDataPoints={false}
            dataPointsColor="#667eea"
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

        {/* Footer con información adicional */}
        <XStack justifyContent="space-between" marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)">
          <YStack>
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              Inicio
            </Text>
            <Text fontSize="$4" fontWeight="600" color="white">
              ${data[0].value.toLocaleString('es-AR')}
            </Text>
          </YStack>
          <YStack alignItems="flex-end">
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              Actual
            </Text>
            <Text fontSize="$4" fontWeight="600" color="#4ade80">
              ${data[data.length - 1].value.toLocaleString('es-AR')}
            </Text>
          </YStack>
        </XStack>

        {/* Indicador de crecimiento */}
        <XStack alignItems="center" justifyContent="center" marginTop="$3">
          <Ionicons name="arrow-up" size={16} color="#4ade80" />
          <Text fontSize="$3" color="#4ade80" fontWeight="600" marginLeft="$1">
            +{(((data[data.length - 1].value - data[0].value) / data[0].value) * 100).toFixed(1)}%
          </Text>
          <Text fontSize="$3" color="rgba(255,255,255,0.6)" marginLeft="$2">
            en {data.length} meses
          </Text>
        </XStack>
      </YStack>
    </Animated.View>
  );
}
