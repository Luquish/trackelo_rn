import { ScrollView, YStack, XStack, Text, Card, Button } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  FadeInDown,
  SlideInLeft,
  SlideInRight
} from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

// Función simulada para obtener datos del servidor
const fetchUserData = async () => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    name: 'Usuario Trackelo',
    email: 'usuario@trackelo.com',
    lastLogin: new Date().toLocaleDateString(),
    stats: {
      tasksCompleted: 42,
      streak: 7,
      level: 'Pro'
    }
  };
};

export default function HomeScreen() {
  const scale = useSharedValue(1);
  const [localData, setLocalData] = useState<string | null>(null);
  
  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // React Query para datos del servidor
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // AsyncStorage para datos locales
  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('trackelo_local_data');
        setLocalData(savedData);
      } catch (error) {
        console.error('Error loading local data:', error);
      }
    };
    loadLocalData();
  }, []);

  const saveLocalData = async () => {
    try {
      const newData = `Datos guardados: ${new Date().toLocaleTimeString()}`;
      await AsyncStorage.setItem('trackelo_local_data', newData);
      setLocalData(newData);
    } catch (error) {
      console.error('Error saving local data:', error);
    }
  };

  const handlePress = () => {
    scale.value = withSpring(scale.value === 1 ? 1.1 : 1, {
      damping: 15,
      stiffness: 150,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} padding="$4" space="$4">
          <YStack alignItems="center" space="$2">
            <Animated.View entering={FadeInDown.delay(200)}>
              <Text fontSize="$8" fontWeight="bold" color="$color12">
                Bienvenido a Trackelo 🎯
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(400)}>
              <Text fontSize="$5" color="$color10">
                Pantalla de Inicio
              </Text>
            </Animated.View>
          </YStack>
          
          {/* Datos del servidor con React Query */}
          <Animated.View entering={SlideInLeft.delay(600)}>
            <Card elevate padding="$4" backgroundColor="$background">
              <YStack space="$3">
                <XStack alignItems="center" space="$2">
                  <Ionicons name="server" size={24} color="#007AFF" />
                  <Text fontSize="$6" fontWeight="600" color="$color12">
                    Datos del Servidor
                  </Text>
                </XStack>
                {isLoading ? (
                  <Text fontSize="$4" color="$color10">Cargando datos...</Text>
                ) : error ? (
                  <Text fontSize="$4" color="$red10">Error al cargar datos</Text>
                ) : userData ? (
                  <YStack space="$2">
                    <Text fontSize="$4" color="$color10">
                      👤 {userData.name}
                    </Text>
                    <Text fontSize="$4" color="$color10">
                      📧 {userData.email}
                    </Text>
                    <Text fontSize="$4" color="$color10">
                      📊 Tareas completadas: {userData.stats.tasksCompleted}
                    </Text>
                    <Text fontSize="$4" color="$color10">
                      🔥 Racha: {userData.stats.streak} días
                    </Text>
                  </YStack>
                ) : null}
                <Animated.View style={animatedButtonStyle}>
                  <Button theme="blue" size="$3" onPress={handlePress}>
                    <Text color="white" fontWeight="600">Explorar</Text>
                  </Button>
                </Animated.View>
              </YStack>
            </Card>
          </Animated.View>

          {/* Datos locales con AsyncStorage */}
          <Animated.View entering={SlideInRight.delay(800)}>
            <Card elevate padding="$4" backgroundColor="$background">
              <YStack space="$3">
                <XStack alignItems="center" space="$2">
                  <Ionicons name="phone-portrait" size={24} color="#34C759" />
                  <Text fontSize="$6" fontWeight="600" color="$color12">
                    Almacenamiento Local
                  </Text>
                </XStack>
                <Text fontSize="$4" color="$color10" lineHeight="$1">
                  Datos guardados localmente en el dispositivo:
                </Text>
                {localData ? (
                  <Card backgroundColor="$green2" padding="$2">
                    <Text fontSize="$3" color="$green11">
                      {localData}
                    </Text>
                  </Card>
                ) : (
                  <Text fontSize="$4" color="$color8">
                    No hay datos guardados aún
                  </Text>
                )}
                <Button theme="green" size="$3" onPress={saveLocalData}>
                  <Text color="white" fontWeight="600">Guardar Datos</Text>
                </Button>
              </YStack>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1000)}>
            <XStack space="$3" justifyContent="center">
              <Button theme="green" size="$2">
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text color="white" marginLeft="$2">Acción 1</Text>
              </Button>
              <Button theme="orange" size="$2">
                <Ionicons name="star" size={16} color="white" />
                <Text color="white" marginLeft="$2">Acción 2</Text>
              </Button>
            </XStack>
          </Animated.View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

