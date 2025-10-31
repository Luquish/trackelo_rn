import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { PieChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface InvestmentData {
  value: number;
  color: string;
  text?: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface PortfolioDonutChartProps {
  data?: InvestmentData[];
  totalInvestment?: number;
}

// Datos de ejemplo: distribución del portfolio de inversiones
const defaultData: InvestmentData[] = [
  { value: 5250, color: '#f59e0b', label: 'Broker Local', icon: 'business' },
  { value: 3750, color: '#3b82f6', label: 'ETF Internacional', icon: 'globe' },
  { value: 3000, color: '#8b5cf6', label: 'Crypto', icon: 'logo-bitcoin' },
  { value: 2000, color: '#10b981', label: 'Fondo Común', icon: 'briefcase' },
];

export default function PortfolioDonutChart({
  data = defaultData,
  totalInvestment = defaultData.reduce((sum, item) => sum + item.value, 0)
}: PortfolioDonutChartProps) {

  // Calcular porcentajes
  const dataWithPercentage = data.map(item => ({
    ...item,
    text: `${((item.value / totalInvestment) * 100).toFixed(1)}%`,
  }));

  // Calcular diversificación (inversión más grande / total)
  const maxInvestment = Math.max(...data.map(item => item.value));
  const diversificationScore = ((1 - (maxInvestment / totalInvestment)) * 100).toFixed(0);

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
        <XStack alignItems="center" space="$2" marginBottom="$4">
          <Ionicons name="pie-chart" size={24} color="#667eea" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Mi Portfolio
          </Text>
        </XStack>

        {/* Gráfico y Leyenda */}
        <XStack justifyContent="space-between" alignItems="center">
          {/* Donut Chart */}
          <YStack alignItems="center">
            <PieChart
              data={dataWithPercentage}
              donut
              radius={80}
              innerRadius={55}
              centerLabelComponent={() => (
                <YStack alignItems="center">
                  <Text fontSize="$2" color="rgba(255,255,255,0.6)">
                    Total
                  </Text>
                  <Text fontSize="$5" fontWeight="bold" color="white">
                    ${totalInvestment.toLocaleString('es-AR')}
                  </Text>
                </YStack>
              )}
              showText
              textColor="white"
              textSize={11}
              fontWeight="bold"
            />
          </YStack>

          {/* Leyenda */}
          <YStack gap="$2" flex={1} paddingLeft="$4">
            {dataWithPercentage.map((item, index) => (
              <XStack key={index} alignItems="center" gap="$2">
                <YStack
                  width={12}
                  height={12}
                  borderRadius="$2"
                  backgroundColor={item.color}
                />
                <Ionicons name={item.icon} size={16} color={item.color} />
                <YStack flex={1}>
                  <Text fontSize="$2" color="white" fontWeight="500" numberOfLines={1}>
                    {item.label}
                  </Text>
                  <XStack gap="$1">
                    <Text fontSize="$1" color="rgba(255,255,255,0.6)">
                      ${(item.value / 1000).toFixed(1)}k
                    </Text>
                    <Text fontSize="$1" color={item.color} fontWeight="600">
                      {item.text}
                    </Text>
                  </XStack>
                </YStack>
              </XStack>
            ))}
          </YStack>
        </XStack>

        {/* Footer con métricas */}
        <YStack marginTop="$4" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" gap="$2">
          {/* Inversión principal */}
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" gap="$2">
              <Ionicons name="star" size={16} color="#f59e0b" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                Mayor inversión
              </Text>
            </XStack>
            <Text fontSize="$3" color={dataWithPercentage[0].color} fontWeight="600">
              {dataWithPercentage[0].label} ({dataWithPercentage[0].text})
            </Text>
          </XStack>

          {/* Score de diversificación */}
          <XStack
            alignItems="center"
            justifyContent="space-between"
            padding="$2"
            backgroundColor="rgba(102, 126, 234, 0.1)"
            borderRadius="$3"
          >
            <XStack alignItems="center" gap="$2">
              <Ionicons name="shield-checkmark" size={16} color="#667eea" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                Diversificación
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <Text fontSize="$4" color="#667eea" fontWeight="bold">
                {diversificationScore}%
              </Text>
              <Ionicons
                name={parseInt(diversificationScore) > 60 ? "checkmark-circle" : "alert-circle"}
                size={18}
                color={parseInt(diversificationScore) > 60 ? "#10b981" : "#f59e0b"}
              />
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
