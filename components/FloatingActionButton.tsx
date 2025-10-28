import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withTiming
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  onActionPress: (type: 'expense' | 'investment' | 'income') => void;
}

export default function FloatingActionButton({ onActionPress }: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotationValue = useSharedValue(0);

  const toggleFab = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    // Animación de rotación del ícono - más suave y lenta
    rotationValue.value = withTiming(newExpanded ? 360 : 0, {
      duration: 600, // Más lento
    });
  };

  const handleAction = (type: 'expense' | 'investment' | 'income') => {
    toggleFab();
    onActionPress(type);
  };

  // Estilo animado para la rotación del ícono
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotationValue.value}deg` }],
    };
  });

  return (
    <>
      {/* Opciones del menú - POSICIÓN ABSOLUTA INDEPENDIENTE */}
      {isExpanded && (
        <YStack position="absolute" bottom="$12" right="$6" zIndex={999}>
          {/* Opción: Ingreso */}
          <Animated.View
            entering={FadeInUp.delay(100).springify().damping(15).stiffness(150)}
            style={{ marginBottom: 12 }}
          >
            <Pressable onPress={() => handleAction('income')}>
              <XStack
                backgroundColor="#4ade80"
                paddingHorizontal="$4"
                paddingVertical="$3"
                borderRadius="$10"
                alignItems="center"
                space="$2"
                elevation={4}
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.3}
                shadowRadius={4}
              >
                <Ionicons name="arrow-down-circle" size={20} color="white" />
                <Text color="white" fontWeight="600" fontSize="$4">
                  Ingreso
                </Text>
              </XStack>
            </Pressable>
          </Animated.View>

          {/* Opción: Inversión */}
          <Animated.View
            entering={FadeInUp.delay(50).springify().damping(15).stiffness(150)}
            style={{ marginBottom: 12 }}
          >
            <Pressable onPress={() => handleAction('investment')}>
              <XStack
                backgroundColor="#60a5fa"
                paddingHorizontal="$4"
                paddingVertical="$3"
                borderRadius="$10"
                alignItems="center"
                space="$2"
                elevation={4}
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.3}
                shadowRadius={4}
              >
                <Ionicons name="trending-up" size={20} color="white" />
                <Text color="white" fontWeight="600" fontSize="$4">
                  Inversión
                </Text>
              </XStack>
            </Pressable>
          </Animated.View>

          {/* Opción: Gasto */}
          <Animated.View
            entering={FadeInUp.springify().damping(15).stiffness(150)}
            style={{ marginBottom: 12 }}
          >
            <Pressable onPress={() => handleAction('expense')}>
              <XStack
                backgroundColor="#f87171"
                paddingHorizontal="$4"
                paddingVertical="$3"
                borderRadius="$10"
                alignItems="center"
                space="$2"
                elevation={4}
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.3}
                shadowRadius={4}
              >
                <Ionicons name="arrow-up-circle" size={20} color="white" />
                <Text color="white" fontWeight="600" fontSize="$4">
                  Gasto
                </Text>
              </XStack>
            </Pressable>
          </Animated.View>
        </YStack>
      )}

      {/* Botón principal FAB - POSICIÓN ABSOLUTA INDEPENDIENTE Y FIJA */}
      <YStack position="absolute" bottom="$6" right="$6" zIndex={1000}>
        <Pressable onPress={toggleFab}>
          <YStack
            backgroundColor="#667eea"
            width={56}
            height={56}
            borderRadius={28}
            alignItems="center"
            justifyContent="center"
            elevation={8}
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            <Animated.View style={iconStyle}>
              <Ionicons name="add" size={32} color="white" />
            </Animated.View>
          </YStack>
        </Pressable>
      </YStack>
    </>
  );
}
