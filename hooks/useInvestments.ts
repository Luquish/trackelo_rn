import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import * as Device from 'expo-constants';

export interface InvestmentTransaction {
    id: string;
    account_id: string;
    amount_minor: number;
    device_id: string;
    kind: 'contribution' | 'withdrawal' | 'rebalance';
    linked_expense_id: string | null;
    note: string | null;
    occurred_at: string;
    updated_at: string;
}

export interface CreateInvestmentInput {
    account_id: string;
    amount_minor: number;
    kind: 'contribution' | 'withdrawal' | 'rebalance';
    note?: string;
    occurred_at?: string;
    linked_expense_id?: string;
}

const getDeviceId = () => {
    return Device.default.deviceId || Device.default.sessionId || 'unknown-device';
};

export const useInvestments = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ['investments', startDate, endDate],
        queryFn: async () => {
            let query = supabase
                .from('investment_transactions')
                .select(`
          *,
          account:investment_accounts(
            *,
            platform:investment_platforms(*)
          )
        `)
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

export const useCreateInvestment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: CreateInvestmentInput) => {
            const { data, error } = await supabase
                .from('investment_transactions')
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
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['balance'] });
        },
    });
};

