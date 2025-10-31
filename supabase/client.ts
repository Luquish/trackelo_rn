import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

import type { Database } from './types';

type ExpoExtra = {
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    supabase?: {
        url?: string;
        anonKey?: string;
    };
};

const resolveExpoExtra = (): ExpoExtra => {
    const expoConfigExtra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;
    const legacyExtra = (Constants.manifest?.extra ?? {}) as ExpoExtra;
    const manifest2Extra = (Constants.manifest2?.extra?.expoClient?.extra ?? {}) as ExpoExtra;

    return {
        ...legacyExtra,
        ...manifest2Extra,
        ...expoConfigExtra,
    };
};

const extra = resolveExpoExtra();

const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL ?? extra.supabaseUrl ?? extra.supabase?.url;
const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.EXPO_PUBLIC_SUPABASE_KEY ??
    extra.supabaseAnonKey ??
    extra.supabase?.anonKey;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase configuration. Ensure supabaseUrl and supabaseAnonKey are defined in expo.extra or EXPO_PUBLIC environment variables.'
    );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export type { Database };

