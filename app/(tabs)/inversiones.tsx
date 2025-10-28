import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenHeader from '../../components/layout/ScreenHeader';
import InfoCard from '../../components/cards/InfoCard';

export default function InversionesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" space="$4">
          
          <ScreenHeader 
            title="Inversiones" 
            subtitle="Gestiona tus inversiones" 
          />

          <InfoCard
            icon="trending-up"
            iconColor="#34C759"
            title="Portfolio"
            description="Próximamente: Visualiza y gestiona tus inversiones"
            enteringAnimation={FadeInDown}
            delay={600}
          />

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
