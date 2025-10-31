import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import * as Device from 'expo-constants';

export interface Expense {
    id: string;
    amount_minor: number;
    category_id: string;
    currency_code: string;
    device_id: string;
    kind: 'expense' | 'income';
    note: string | null;
    occurred_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface CreateExpenseInput {
    amount_minor: number;
    category_id: string;
    currency_code: string;
    kind: 'expense' | 'income';
    note?: string;
    occurred_at?: string;
}

// Get device ID
const getDeviceId = () => {
    return Device.default.deviceId || Device.default.sessionId || 'unknown-device';
};

export const useExpenses = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ['expenses', startDate, endDate],
        queryFn: async () => {
            let query = supabase
                .from('expenses')
                .select(`
          *,
          category:categories(*)
        `)
                .is('deleted_at', null)
                .order('occurred_at', { ascending: false });

            if (startDate) {
                query = query.gte('occurred_at', startDate);
            }
            if (endDate) {
                query = query.lte('occurred_at', endDate);
            }

            const { data, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

export const useCreateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: CreateExpenseInput) => {
            const { data, error } = await supabase
                .from('expenses')
                .insert({
                    ...input,
                    device_id: getDeviceId(),
                    occurred_at: input.occurred_at || new Date().toISOString(),
                })
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['balance'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (expenseId: string) => {
            const { error } = await supabase
                .from('expenses')
                .update({ deleted_at: new Date().toISOString() })
                .eq('id', expenseId);

            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['balance'] });
        },
    });
};

