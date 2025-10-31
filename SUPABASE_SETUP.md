# Supabase Setup Guide

This guide will help you connect your Trackelo app to Supabase.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Expo CLI installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Project name: `trackelo` (or your preferred name)
   - Database password: (create a strong password)
   - Region: Choose the closest to your users
4. Click "Create new project"

## Step 2: Get Your API Credentials

1. Once your project is created, go to Settings → API
2. You'll need two values:
   - **Project URL**: Found under "Project URL"
   - **Anon Key**: Found under "Project API keys" → "anon public"

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Set Up Database Schema

Run the following SQL in your Supabase SQL Editor (Database → SQL Editor):

```sql
-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'investment')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expenses table (handles both expenses and income)
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_minor INTEGER NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  currency_code TEXT NOT NULL DEFAULT 'ARS',
  device_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('expense', 'income')),
  note TEXT,
  occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create investment platforms table
CREATE TABLE investment_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment accounts table
CREATE TABLE investment_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  currency_code TEXT NOT NULL DEFAULT 'ARS',
  type TEXT NOT NULL CHECK (type IN ('brokerage', 'savings', 'crypto', 'other')),
  platform_id UUID NOT NULL REFERENCES investment_platforms(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment transactions table
CREATE TABLE investment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES investment_accounts(id),
  amount_minor INTEGER NOT NULL,
  device_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('contribution', 'withdrawal', 'rebalance')),
  linked_expense_id UUID REFERENCES expenses(id),
  note TEXT,
  occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_minor INTEGER NOT NULL,
  category_id UUID REFERENCES categories(id),
  period_month TEXT NOT NULL,
  scope TEXT NOT NULL CHECK (scope IN ('all', 'category')),
  warning_threshold_pct INTEGER NOT NULL DEFAULT 80,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recurring expenses table
CREATE TABLE recurring_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  amount_minor INTEGER NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  currency_code TEXT NOT NULL DEFAULT 'ARS',
  day_of_month INTEGER NOT NULL CHECK (day_of_month BETWEEN 1 AND 31),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  note TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment goals table
CREATE TABLE investment_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  target_minor INTEGER NOT NULL,
  currency_code TEXT NOT NULL DEFAULT 'ARS',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment goal allocations table
CREATE TABLE investment_goal_allocations (
  goal_id UUID NOT NULL REFERENCES investment_goals(id),
  platform_id UUID NOT NULL REFERENCES investment_platforms(id),
  target_pct NUMERIC NOT NULL,
  PRIMARY KEY (goal_id, platform_id)
);

-- Create app settings table
CREATE TABLE app_settings (
  key TEXT PRIMARY KEY,
  value_json JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_expenses_occurred_at ON expenses(occurred_at DESC);
CREATE INDEX idx_expenses_category_id ON expenses(category_id);
CREATE INDEX idx_expenses_kind ON expenses(kind);
CREATE INDEX idx_expenses_deleted_at ON expenses(deleted_at);
CREATE INDEX idx_investment_transactions_occurred_at ON investment_transactions(occurred_at DESC);
CREATE INDEX idx_investment_transactions_account_id ON investment_transactions(account_id);
CREATE INDEX idx_categories_type ON categories(type);

-- Insert default expense categories
INSERT INTO categories (name, emoji, type, sort_order) VALUES
  ('Comida', '🍔', 'expense', 1),
  ('Transporte', '🚗', 'expense', 2),
  ('Hogar', '🏠', 'expense', 3),
  ('Entretenimiento', '🎮', 'expense', 4),
  ('Salud', '💊', 'expense', 5),
  ('Otro gasto', '➕', 'expense', 6);

-- Insert default income categories
INSERT INTO categories (name, emoji, type, sort_order) VALUES
  ('Salario', '💼', 'income', 1),
  ('Deuda', '💵', 'income', 2),
  ('Transferencia', '🔄', 'income', 3),
  ('Venta', '🛒', 'income', 4),
  ('Otro ingreso', '➕', 'income', 5);

-- Insert default investment platforms
INSERT INTO investment_platforms (name, emoji, sort_order) VALUES
  ('Broker local', '🏢', 1),
  ('ETF internacional', '🌍', 2),
  ('Exchange cripto', '₿', 3),
  ('Fondo común', '📊', 4);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_goal_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (modify these based on your authentication needs)
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true);
CREATE POLICY "Allow all operations on expenses" ON expenses FOR ALL USING (true);
CREATE POLICY "Allow all operations on investment_platforms" ON investment_platforms FOR ALL USING (true);
CREATE POLICY "Allow all operations on investment_accounts" ON investment_accounts FOR ALL USING (true);
CREATE POLICY "Allow all operations on investment_transactions" ON investment_transactions FOR ALL USING (true);
CREATE POLICY "Allow all operations on budgets" ON budgets FOR ALL USING (true);
CREATE POLICY "Allow all operations on recurring_expenses" ON recurring_expenses FOR ALL USING (true);
CREATE POLICY "Allow all operations on investment_goals" ON investment_goals FOR ALL USING (true);
CREATE POLICY "Allow all operations on investment_goal_allocations" ON investment_goal_allocations FOR ALL USING (true);
CREATE POLICY "Allow all operations on app_settings" ON app_settings FOR ALL USING (true);
```

**Note**: The policies above allow public access. For production, you should implement proper authentication and user-specific policies.

## Step 5: Install Dependencies

Dependencies have already been installed, but if you need to reinstall them:

```bash
npm install @supabase/supabase-js react-native-url-polyfill
```

## Step 6: Start the App

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan the QR code with Expo Go on your phone

## Project Structure

```
/supabase
  ├── client.ts      # Supabase client configuration
  ├── types.ts       # TypeScript types from database
  └── index.ts       # Exports

/hooks
  ├── useBalance.ts           # Hook for balance data
  ├── useCategories.ts        # Hook for categories
  ├── useExpenses.ts          # Hook for expenses/income
  ├── useInvestments.ts       # Hook for investment transactions
  └── useInvestmentAccounts.ts # Hook for investment accounts
```

## How It Works

### Data Flow

1. **Categories**: Loaded from `categories` table, filtered by type (expense/income/investment)
2. **Balance**: Calculated from `expenses` and `investment_transactions` tables
3. **Transactions**: Stored in `expenses` table with `kind` field ('expense' or 'income')
4. **Investments**: Stored in `investment_transactions` table linked to `investment_accounts`

### Amount Storage

All amounts are stored in **minor units** (cents/centavos):
- $100.50 → stored as `10050`
- When displaying: divide by 100
- When saving: multiply by 100

### Custom Hooks Usage

```typescript
// Fetch expenses for current month
const { data, isLoading } = useExpenses(startDate, endDate);

// Create a new expense
const { mutate: createExpense } = useCreateExpense();
createExpense({
  amount_minor: 10000, // $100.00
  category_id: 'category-uuid',
  currency_code: 'ARS',
  kind: 'expense',
  note: 'Coffee',
});
```

## Troubleshooting

### Error: "Missing Supabase configuration"

Make sure your `.env` file exists and contains valid credentials.

### Error: "relation does not exist"

Run the SQL schema creation script in your Supabase SQL Editor.

### Error: "Failed to fetch"

Check your network connection and ensure your Supabase project URL is correct.

### Data not showing up

1. Check that you've run the SQL schema and inserted default categories
2. Verify your API keys are correct
3. Check the Network tab in your browser/debugger for failed requests

## Next Steps

1. **Add Authentication**: Implement Supabase Auth for user-specific data
2. **Update RLS Policies**: Restrict data access based on authenticated users
3. **Add Real-time Subscriptions**: Use Supabase real-time features for live updates
4. **Sync Across Devices**: Data is automatically synced via Supabase

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Expo Documentation](https://docs.expo.dev)
- [React Query Documentation](https://tanstack.com/query/latest)

