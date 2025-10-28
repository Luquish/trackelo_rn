import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface InfoCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  description: string;
  enteringAnimation?: any;
  delay?: number;
}

export default function InfoCard({ 
  icon, 
  iconColor, 
  title, 
  description, 
  enteringAnimation,
  delay = 0 
}: InfoCardProps) {
  return (
    <Animated.View entering={enteringAnimation?.delay(delay)}>
      <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
        <YStack space="$3">
          <XStack alignItems="center" space="$2">
            <Ionicons name={icon} size={24} color={iconColor} />
            <Text fontSize="$6" fontWeight="600" color="#ffffff">
              {title}
            </Text>
          </XStack>
          <Text fontSize="$4" color="#a0a0a0" lineHeight="$1">
            {description}
          </Text>
        </YStack>
      </Card>
    </Animated.View>
  );
}
