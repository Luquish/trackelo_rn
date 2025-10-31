import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

export type CategoryType = 'expense' | 'income' | 'investment';

export interface Category {
    id: string;
    name: string;
    emoji: string | null;
    type: CategoryType;
    sort_order: number;
    updated_at: string;
}

export const useCategories = (type?: CategoryType) => {
    return useQuery({
        queryKey: ['categories', type],
        queryFn: async () => {
            let query = supabase
                .from('categories')
                .select('*')
                .order('sort_order', { ascending: true });

            if (type) {
                query = query.eq('type', type);
            }

            const { data, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            return data as Category[];
        },
    });
};

