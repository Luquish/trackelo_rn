import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

export interface BalanceData {
    netBalance: number;
    income: number;
    expenses: number;
    investment: number;
}

export const useBalance = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ['balance', startDate, endDate],
        queryFn: async () => {
            // Fetch expenses and incomes
            let expensesQuery = supabase
                .from('expenses')
                .select('amount_minor, kind')
                .is('deleted_at', null);

            if (startDate) {
                expensesQuery = expensesQuery.gte('occurred_at', startDate);
            }
            if (endDate) {
                expensesQuery = expensesQuery.lte('occurred_at', endDate);
            }

            const { data: expensesData, error: expensesError } = await expensesQuery;

            if (expensesError) {
                throw new Error(expensesError.message);
            }

            // Fetch investment transactions
            let investmentsQuery = supabase
                .from('investment_transactions')
                .select('amount_minor, kind');

            if (startDate) {
                investmentsQuery = investmentsQuery.gte('occurred_at', startDate);
            }
            if (endDate) {
                investmentsQuery = investmentsQuery.lte('occurred_at', endDate);
            }

            const { data: investmentsData, error: investmentsError } = await investmentsQuery;

            if (investmentsError) {
                throw new Error(investmentsError.message);
            }

            // Calculate totals (amount_minor is in cents/smallest unit)
            let income = 0;
            let expenses = 0;
            let investment = 0;

            expensesData?.forEach((item) => {
                const amount = item.amount_minor / 100; // Convert from minor units
                if (item.kind === 'income') {
                    income += amount;
                } else {
                    expenses += amount;
                }
            });

            investmentsData?.forEach((item) => {
                const amount = item.amount_minor / 100;
                if (item.kind === 'contribution') {
                    investment += amount;
                }
            });

            const netBalance = income - expenses - investment;

            return {
                netBalance,
                income,
                expenses,
                investment,
            } as BalanceData;
        },
    });
};

