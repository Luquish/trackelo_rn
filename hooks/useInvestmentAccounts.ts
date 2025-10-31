import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

export interface InvestmentAccount {
    id: string;
    name: string;
    currency_code: string;
    type: 'brokerage' | 'savings' | 'crypto' | 'other';
    platform_id: string;
    updated_at: string;
}

export const useInvestmentAccounts = () => {
    return useQuery({
        queryKey: ['investment_accounts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('investment_accounts')
                .select(`
          *,
          platform:investment_platforms(*)
        `)
                .order('name', { ascending: true });

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

