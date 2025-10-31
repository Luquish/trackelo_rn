# Generating TypeScript Types from Supabase

When you make changes to your Supabase database schema, you'll want to regenerate the TypeScript types to keep your code in sync.

## Using Supabase CLI (Recommended)

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Generate Types

```bash
supabase gen types typescript --project-id YOUR_PROJECT_ID > supabase/types.ts
```

Replace `YOUR_PROJECT_ID` with your actual project ID from Supabase dashboard (Settings → General → Reference ID).

## Alternative: Using the Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Scroll down to "API Settings"
4. Under "Schema", click "Generate Types"
5. Select "TypeScript"
6. Copy the generated code
7. Replace the content of `supabase/types.ts` with the copied code

## Automating Type Generation

You can add this to your `package.json` scripts:

```json
{
  "scripts": {
    "types:generate": "supabase gen types typescript --project-id YOUR_PROJECT_ID > supabase/types.ts"
  }
}
```

Then run:
```bash
npm run types:generate
```

## When to Regenerate Types

Regenerate your types whenever you:
- Add new tables
- Modify table columns
- Change column types
- Add or remove relationships
- Modify table policies

This ensures your TypeScript code stays in sync with your database schema and you get proper type checking and autocomplete.

