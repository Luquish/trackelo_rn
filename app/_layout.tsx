import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, createTamagui } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const config = createTamagui(defaultConfig);

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: 2,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="dark">
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0f0f0f' }
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

