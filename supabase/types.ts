export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            app_settings: {
                Row: {
                    key: string;
                    updated_at: string;
                    value_json: Json;
                };
                Insert: {
                    key: string;
                    updated_at?: string;
                    value_json: Json;
                };
                Update: {
                    key?: string;
                    updated_at?: string;
                    value_json?: Json;
                };
                Relationships: [];
            };
            budgets: {
                Row: {
                    amount_minor: number;
                    category_id: string | null;
                    id: string;
                    period_month: string;
                    scope: 'all' | 'category';
                    updated_at: string;
                    warning_threshold_pct: number;
                };
                Insert: {
                    amount_minor: number;
                    category_id?: string | null;
                    id?: string;
                    period_month: string;
                    scope: 'all' | 'category';
                    updated_at?: string;
                    warning_threshold_pct: number;
                };
                Update: {
                    amount_minor?: number;
                    category_id?: string | null;
                    id?: string;
                    period_month?: string;
                    scope?: 'all' | 'category';
                    updated_at?: string;
                    warning_threshold_pct?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'budgets_category_id_fkey';
                        columns: ['category_id'];
                        referencedRelation: 'categories';
                        referencedColumns: ['id'];
                    }
                ];
            };
            categories: {
                Row: {
                    emoji: string | null;
                    id: string;
                    name: string;
                    sort_order: number;
                    type: 'expense' | 'income' | 'investment';
                    updated_at: string;
                };
                Insert: {
                    emoji?: string | null;
                    id?: string;
                    name: string;
                    sort_order: number;
                    type: 'expense' | 'income' | 'investment';
                    updated_at?: string;
                };
                Update: {
                    emoji?: string | null;
                    id?: string;
                    name?: string;
                    sort_order?: number;
                    type?: 'expense' | 'income' | 'investment';
                    updated_at?: string;
                };
                Relationships: [];
            };
            expenses: {
                Row: {
                    amount_minor: number;
                    category_id: string;
                    currency_code: string;
                    deleted_at: string | null;
                    device_id: string;
                    id: string;
                    kind: 'expense' | 'income';
                    note: string | null;
                    occurred_at: string;
                    updated_at: string;
                };
                Insert: {
                    amount_minor: number;
                    category_id: string;
                    currency_code: string;
                    deleted_at?: string | null;
                    device_id: string;
                    id?: string;
                    kind: 'expense' | 'income';
                    note?: string | null;
                    occurred_at: string;
                    updated_at?: string;
                };
                Update: {
                    amount_minor?: number;
                    category_id?: string;
                    currency_code?: string;
                    deleted_at?: string | null;
                    device_id?: string;
                    id?: string;
                    kind?: 'expense' | 'income';
                    note?: string | null;
                    occurred_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'expenses_category_id_fkey';
                        columns: ['category_id'];
                        referencedRelation: 'categories';
                        referencedColumns: ['id'];
                    }
                ];
            };
            investment_accounts: {
                Row: {
                    currency_code: string;
                    id: string;
                    name: string;
                    platform_id: string;
                    type: 'brokerage' | 'savings' | 'crypto' | 'other';
                    updated_at: string;
                };
                Insert: {
                    currency_code: string;
                    id?: string;
                    name: string;
                    platform_id: string;
                    type: 'brokerage' | 'savings' | 'crypto' | 'other';
                    updated_at?: string;
                };
                Update: {
                    currency_code?: string;
                    id?: string;
                    name?: string;
                    platform_id?: string;
                    type?: 'brokerage' | 'savings' | 'crypto' | 'other';
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'investment_accounts_platform_id_fkey';
                        columns: ['platform_id'];
                        referencedRelation: 'investment_platforms';
                        referencedColumns: ['id'];
                    }
                ];
            };
            investment_goal_allocations: {
                Row: {
                    goal_id: string;
                    platform_id: string;
                    target_pct: string;
                };
                Insert: {
                    goal_id: string;
                    platform_id: string;
                    target_pct: string;
                };
                Update: {
                    goal_id?: string;
                    platform_id?: string;
                    target_pct?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'investment_goal_allocations_goal_id_fkey';
                        columns: ['goal_id'];
                        referencedRelation: 'investment_goals';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'investment_goal_allocations_platform_id_fkey';
                        columns: ['platform_id'];
                        referencedRelation: 'investment_platforms';
                        referencedColumns: ['id'];
                    }
                ];
            };
            investment_goals: {
                Row: {
                    currency_code: string;
                    id: string;
                    name: string;
                    target_minor: number;
                    updated_at: string;
                };
                Insert: {
                    currency_code: string;
                    id?: string;
                    name: string;
                    target_minor: number;
                    updated_at?: string;
                };
                Update: {
                    currency_code?: string;
                    id?: string;
                    name?: string;
                    target_minor?: number;
                    updated_at?: string;
                };
                Relationships: [];
            };
            investment_platforms: {
                Row: {
                    emoji: string | null;
                    id: string;
                    name: string;
                    sort_order: number;
                    updated_at: string;
                };
                Insert: {
                    emoji?: string | null;
                    id?: string;
                    name: string;
                    sort_order: number;
                    updated_at?: string;
                };
                Update: {
                    emoji?: string | null;
                    id?: string;
                    name?: string;
                    sort_order?: number;
                    updated_at?: string;
                };
                Relationships: [];
            };
            investment_transactions: {
                Row: {
                    account_id: string;
                    amount_minor: number;
                    device_id: string;
                    id: string;
                    kind: 'contribution' | 'withdrawal' | 'rebalance';
                    linked_expense_id: string | null;
                    note: string | null;
                    occurred_at: string;
                    updated_at: string;
                };
                Insert: {
                    account_id: string;
                    amount_minor: number;
                    device_id: string;
                    id?: string;
                    kind: 'contribution' | 'withdrawal' | 'rebalance';
                    linked_expense_id?: string | null;
                    note?: string | null;
                    occurred_at: string;
                    updated_at?: string;
                };
                Update: {
                    account_id?: string;
                    amount_minor?: number;
                    device_id?: string;
                    id?: string;
                    kind?: 'contribution' | 'withdrawal' | 'rebalance';
                    linked_expense_id?: string | null;
                    note?: string | null;
                    occurred_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'investment_transactions_account_id_fkey';
                        columns: ['account_id'];
                        referencedRelation: 'investment_accounts';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'investment_transactions_linked_expense_id_fkey';
                        columns: ['linked_expense_id'];
                        referencedRelation: 'expenses';
                        referencedColumns: ['id'];
                    }
                ];
            };
            recurring_expenses: {
                Row: {
                    amount_minor: number;
                    category_id: string;
                    currency_code: string;
                    day_of_month: number;
                    id: string;
                    is_active: boolean;
                    name: string;
                    note: string | null;
                    updated_at: string;
                };
                Insert: {
                    amount_minor: number;
                    category_id: string;
                    currency_code: string;
                    day_of_month: number;
                    id?: string;
                    is_active?: boolean;
                    name: string;
                    note?: string | null;
                    updated_at?: string;
                };
                Update: {
                    amount_minor?: number;
                    category_id?: string;
                    currency_code?: string;
                    day_of_month?: number;
                    id?: string;
                    is_active?: boolean;
                    name?: string;
                    note?: string | null;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'recurring_expenses_category_id_fkey';
                        columns: ['category_id'];
                        referencedRelation: 'categories';
                        referencedColumns: ['id'];
                    }
                ];
            };
        };
        Views: {};
        Functions: {};
        Enums: {};
        CompositeTypes: {};
    };
}

