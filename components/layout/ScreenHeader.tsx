import React from 'react';
import { YStack, Text } from 'tamagui';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  titleDelay?: number;
  subtitleDelay?: number;
}

export default function ScreenHeader({ 
  title, 
  subtitle, 
  titleDelay = 200, 
  subtitleDelay = 400 
}: ScreenHeaderProps) {
  return (
    <YStack alignItems="center" space="$2">
      <Animated.View entering={FadeInDown.delay(titleDelay)}>
        <Text fontSize="$8" fontWeight="bold" color="#ffffff">
          {title}
        </Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(subtitleDelay)}>
        <Text fontSize="$5" color="#a0a0a0">
          {subtitle}
        </Text>
      </Animated.View>
    </YStack>
  );
}
