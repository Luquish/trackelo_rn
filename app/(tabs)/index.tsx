import { ScrollView, YStack, XStack, Text, Card, Button } from 'tamagui';
import { LinearGradient } from '@tamagui/linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  FadeIn
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import FloatingActionButton from '../../components/FloatingActionButton';

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

          {/* Tarjeta de Balance Principal con Gradiente */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={[0, 0]}
              end={[1, 1]}
              borderRadius="$6"
              padding="$5"
              elevation={8}
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
            >
              <YStack space="$4">
                {/* Balance Neto */}
                <YStack space="$2">
                  <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" space="$2">
                      <Ionicons name="wallet" size={20} color="rgba(255,255,255,0.9)" />
                      <Text fontSize="$4" color="rgba(255,255,255,0.9)" fontWeight="500">
                        Balance Neto
                      </Text>
                    </XStack>
                    <Button
                      size="$3"
                      circular
                      chromeless
                      onPress={() => setIsBalanceVisible(!isBalanceVisible)}
                      icon={
                        <Ionicons
                          name={isBalanceVisible ? "eye" : "eye-off"}
                          size={20}
                          color="rgba(255,255,255,0.9)"
                        />
                      }
                      accessibilityLabel={isBalanceVisible ? "Ocultar balance" : "Mostrar balance"}
                      accessibilityRole="button"
                      aria-pressed={!isBalanceVisible}
                    />
                  </XStack>
                  <Animated.View entering={FadeIn.duration(200)}>
                    <Text fontSize="$10" fontWeight="bold" color="white">
                      {formatValue(balanceData.netBalance)}
                    </Text>
                  </Animated.View>
                </YStack>

                {/* Divisor */}
                <YStack height={1} backgroundColor="rgba(255,255,255,0.2)" />

                {/* Métricas Financieras */}
                <XStack justifyContent="space-between">
                  {/* Ingresos */}
                  <YStack flex={1} space="$1">
                    <XStack alignItems="center" space="$1">
                      <Ionicons name="arrow-down-circle" size={16} color="#4ade80" />
                      <Text fontSize="$2" color="rgba(255,255,255,0.8)">
                        Ingresos
                      </Text>
                    </XStack>
                    <Text fontSize="$5" fontWeight="600" color="white">
                      {formatValue(balanceData.income)}
                    </Text>
                  </YStack>

                  {/* Gastos */}
                  <YStack flex={1} space="$1" alignItems="center">
                    <XStack alignItems="center" space="$1">
                      <Ionicons name="arrow-up-circle" size={16} color="#f87171" />
                      <Text fontSize="$2" color="rgba(255,255,255,0.8)">
                        Gastos
                      </Text>
                    </XStack>
                    <Text fontSize="$5" fontWeight="600" color="white">
                      {formatValue(balanceData.expenses)}
                    </Text>
                  </YStack>

                  {/* Aportes Inversión */}
                  <YStack flex={1} space="$1" alignItems="flex-end">
                    <XStack alignItems="center" space="$1">
                      <Ionicons name="trending-up" size={16} color="#60a5fa" />
                      <Text fontSize="$2" color="rgba(255,255,255,0.8)">
                        Inversión
                      </Text>
                    </XStack>
                    <Text fontSize="$5" fontWeight="600" color="white">
                      {formatValue(balanceData.investment)}
                    </Text>
                  </YStack>
                </XStack>
              </YStack>
            </LinearGradient>
          </Animated.View>

          {/* Cards de Detalles */}
          <Animated.View entering={SlideInLeft.delay(500)}>
            <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
              <YStack space="$3">
                <XStack alignItems="center" space="$2">
                  <Ionicons name="analytics" size={24} color="#667eea" />
                  <Text fontSize="$6" fontWeight="600" color="#ffffff">
                    Resumen Mensual
                  </Text>
                </XStack>
                <Text fontSize="$4" color="#a0a0a0">
                  Tus finanzas del mes en curso
                </Text>
                <YStack space="$2">
                  <XStack justifyContent="space-between">
                    <Text fontSize="$4" color="#a0a0a0">
                      Total de transacciones
                    </Text>
                    <Text fontSize="$4" fontWeight="600" color="#ffffff">
                      24
                    </Text>
                  </XStack>
                  <XStack justifyContent="space-between">
                    <Text fontSize="$4" color="#a0a0a0">
                      Ahorro este mes
                    </Text>
                    <Text fontSize="$4" fontWeight="600" color="#4ade80">
                      {formatValue(balanceData.income - balanceData.expenses)}
                    </Text>
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </Animated.View>

          <Animated.View entering={SlideInRight.delay(600)}>
            <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
              <YStack space="$3">
                <XStack alignItems="center" space="$2">
                  <Ionicons name="pie-chart" size={24} color="#764ba2" />
                  <Text fontSize="$6" fontWeight="600" color="#ffffff">
                    Categorías
                  </Text>
                </XStack>
                <Text fontSize="$4" color="#a0a0a0">
                  Análisis de gastos por categoría
                </Text>
                <YStack space="$2">
                  <XStack justifyContent="space-between" alignItems="center">
                    <XStack space="$2" alignItems="center">
                      <Ionicons name="restaurant" size={18} color="#f59e0b" />
                      <Text fontSize="$4" color="#a0a0a0">
                        Alimentación
                      </Text>
                    </XStack>
                    <Text fontSize="$4" fontWeight="600" color="#ffffff">
                      {formatValue(1200)}
                    </Text>
                  </XStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <XStack space="$2" alignItems="center">
                      <Ionicons name="car" size={18} color="#3b82f6" />
                      <Text fontSize="$4" color="#a0a0a0">
                        Transporte
                      </Text>
                    </XStack>
                    <Text fontSize="$4" fontWeight="600" color="#ffffff">
                      {formatValue(800)}
                    </Text>
                  </XStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <XStack space="$2" alignItems="center">
                      <Ionicons name="home" size={18} color="#10b981" />
                      <Text fontSize="$4" color="#a0a0a0">
                        Hogar
                      </Text>
                    </XStack>
                    <Text fontSize="$4" fontWeight="600" color="#ffffff">
                      {formatValue(1200)}
                    </Text>
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </Animated.View>

        </YStack>
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <FloatingActionButton onActionPress={handleFabAction} />
    </SafeAreaView>
  );
}
