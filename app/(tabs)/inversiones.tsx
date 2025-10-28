import { ScrollView, YStack, XStack, Text, Card } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function InversionesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" space="$4">
          <YStack alignItems="center" space="$2">
            <Animated.View entering={FadeInDown.delay(200)}>
              <Text fontSize="$8" fontWeight="bold" color="#ffffff">
                Inversiones
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(400)}>
              <Text fontSize="$5" color="#a0a0a0">
                Gestiona tus inversiones
              </Text>
            </Animated.View>
          </YStack>

          <Animated.View entering={FadeInDown.delay(600)}>
            <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
              <YStack space="$3">
                <XStack alignItems="center" space="$2">
                  <Ionicons name="trending-up" size={24} color="#34C759" />
                  <Text fontSize="$6" fontWeight="600" color="#ffffff">
                    Portfolio
                  </Text>
                </XStack>
                <Text fontSize="$4" color="#a0a0a0">
                  Próximamente: Visualiza y gestiona tus inversiones
                </Text>
              </YStack>
            </Card>
          </Animated.View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
