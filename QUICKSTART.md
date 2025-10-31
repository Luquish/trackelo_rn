# 🚀 Quick Start - Supabase Integration

## What Was Done

Your Trackelo app has been successfully connected to Supabase! Here's what was set up:

### ✅ Installed Packages
- `@supabase/supabase-js` - Supabase JavaScript client
- `react-native-url-polyfill` - URL polyfill for React Native

### ✅ Created Files
1. **`/supabase/`** - Supabase configuration folder
   - `client.ts` - Configured Supabase client
   - `types.ts` - TypeScript types from your database schema
   - `index.ts` - Exports

2. **`/hooks/`** - Custom React hooks for data management
   - `useBalance.ts` - Fetch balance data
   - `useCategories.ts` - Fetch expense/income/investment categories
   - `useExpenses.ts` - Create/read expenses and incomes
   - `useInvestments.ts` - Create/read investment transactions
   - `useInvestmentAccounts.ts` - Fetch investment accounts

3. **Documentation**
   - `SUPABASE_SETUP.md` - Complete Supabase setup guide
   - `scripts/generate-types.md` - Guide to regenerate TypeScript types
   - `.env.example` - Environment variables template

### ✅ Updated Files
1. **`app/(tabs)/index.tsx`** - Now fetches real data from Supabase
2. **`app/add-expense.tsx`** - Now saves expenses to Supabase
3. **`app/add-income.tsx`** - Now saves income to Supabase
4. **`app/add-investment.tsx`** - Now saves investments to Supabase
5. **`app.json`** - Added Supabase configuration
6. **`README.md`** - Updated with Supabase info

## 📋 What You Need To Do

### Step 1: Set Up Your Supabase Project

If you don't have a Supabase project yet:

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be provisioned (~2 minutes)

### Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings → API**
2. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy your **anon/public key** (long string under "Project API keys")

### Step 3: Configure Environment Variables

1. Find the `.env` file in your project root (it should already exist, but is gitignored)
2. If it doesn't exist, create it from the template:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the complete SQL schema from `SUPABASE_SETUP.md` (search for "Step 4")
3. Copy and paste the entire SQL script
4. Click **Run** to create all tables and insert default data

This will create:
- ✅ All necessary tables (categories, expenses, investments, etc.)
- ✅ Indexes for better performance
- ✅ Default categories for expenses and income
- ✅ Default investment platforms
- ✅ Row Level Security policies

### Step 5: Start Your App

```bash
# Start the development server
npm start

# Then press:
# - i for iOS simulator
# - a for Android emulator
# - Scan QR code with Expo Go on your phone
```

## 🎉 You're Done!

Your app is now connected to Supabase and will:
- ✅ Save all expenses/incomes/investments to the cloud
- ✅ Sync automatically across devices (when you add auth)
- ✅ Show real-time balance calculations
- ✅ Load categories from your database
- ✅ Store data persistently in PostgreSQL

## 📚 Next Steps

1. **Test it out**: Try adding an expense or income
2. **Check your data**: Go to Supabase dashboard → Table Editor to see your data
3. **Add authentication**: Follow Supabase auth docs to add user login
4. **Customize categories**: Edit categories in Supabase Table Editor
5. **Add investment accounts**: Go to `investment_accounts` table and add your accounts

## 🐛 Troubleshooting

### App shows "Missing Supabase configuration" error
→ Check that your `.env` file exists and has valid credentials

### No data appears in the app
→ Make sure you ran the SQL schema creation script in Supabase

### "Relation does not exist" error
→ You need to run the SQL schema creation script in your Supabase SQL Editor

### Categories not loading
→ Check that the SQL script inserted default categories (last part of the script)

## 📖 Learn More

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Complete setup guide with detailed explanations
- [Supabase Docs](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)

## 💡 How It Works

### Data Flow
```
User Action → React Hook → Supabase Client → PostgreSQL Database
                ↓
           React Query Cache
                ↓
           UI Updates
```

### Example: Adding an Expense
1. User fills form in `add-expense.tsx`
2. Form calls `useCreateExpense()` hook
3. Hook sends data to Supabase via `supabase.from('expenses').insert()`
4. Supabase stores in PostgreSQL
5. React Query invalidates cache
6. UI automatically refetches and updates

### Database Structure
```
expenses (gastos e ingresos)
├── amount_minor (int) - Amount in cents
├── category_id (uuid) - FK to categories
├── kind (text) - 'expense' or 'income'
├── note (text) - Optional note
└── occurred_at (timestamp)

categories
├── name (text)
├── emoji (text)
├── type (text) - 'expense', 'income', or 'investment'
└── sort_order (int)

investment_transactions
├── amount_minor (int)
├── account_id (uuid) - FK to investment_accounts
├── kind (text) - 'contribution', 'withdrawal', 'rebalance'
└── occurred_at (timestamp)
```

## 🎯 Key Features Now Available

- ✅ **Cloud Storage**: All data saved to PostgreSQL
- ✅ **Real-time Balance**: Calculated from actual transactions
- ✅ **Categories**: Loaded dynamically from database
- ✅ **Transaction History**: Recent transactions from database
- ✅ **Investment Tracking**: Track investments across accounts
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Offline-first**: React Query caching for offline support
- ✅ **Auto-sync**: Changes sync automatically

Enjoy your Supabase-powered financial tracker! 🎊

