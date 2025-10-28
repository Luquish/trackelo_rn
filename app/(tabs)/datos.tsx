import { ScrollView, YStack, XStack, Text, Button } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  BounceIn,
  ZoomIn,
  FlipInEasyX
} from 'react-native-reanimated';
import ScreenHeader from '../../components/layout/ScreenHeader';
import InfoCard from '../../components/cards/InfoCard';
import TaskList from '../../components/lists/TaskList';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" space="$4">
          
          <ScreenHeader 
            title="Datos" 
            subtitle="Análisis y estadísticas" 
          />

          <InfoCard
            icon="bar-chart"
            iconColor="#667eea"
            title="Estadísticas"
            description="Visualiza el rendimiento de tus finanzas con gráficos y análisis detallados."
            enteringAnimation={BounceIn}
            delay={600}
          />

          <InfoCard
            icon="analytics"
            iconColor="#764ba2"
            title="Análisis Avanzado"
            description="Accede a reportes detallados sobre tus inversiones y movimientos financieros."
            enteringAnimation={ZoomIn}
            delay={800}
          />

          <TaskList delay={1000} />

          <Animated.View entering={FlipInEasyX.delay(1200)}>
            <XStack space="$3" justifyContent="center" flexWrap="wrap">
              <Button theme="red" size="$2">
                <Text color="white">Rojo</Text>
              </Button>
              <Button theme="yellow" size="$2">
                <Text color="black">Amarillo</Text>
              </Button>
              <Button theme="pink" size="$2">
                <Text color="white">Rosa</Text>
              </Button>
            </XStack>
          </Animated.View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

