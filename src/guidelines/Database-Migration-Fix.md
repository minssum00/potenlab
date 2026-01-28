# Database Migration Fix Guide

## Issue
When saving a portfolio, you may encounter this error:
```
Error saving portfolio: {
  "code": "PGRST204",
  "details": null,
  "hint": null,
  "message": "Could not find the 'collaboration_tools' column of 'portfolios' in the schema cache"
}
```

This means your database is missing some required columns that were added in recent updates.

## Solution

### Automatic Detection
The system will automatically detect this error and show a migration guide banner at the top of the portfolio form page with the SQL you need to run.

### Manual Steps

1. **Go to Supabase Dashboard**
   - Visit your project at https://supabase.com/dashboard
   - Navigate to your Potenlab project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Run the Migration SQL**
   
   Copy this entire SQL script and paste it into the SQL editor:

   ```sql
   -- 포트폴리오 테이블에 누락된 컬럼 추가
   -- 이 스크립트는 여러 번 실행해도 안전합니다 (IF NOT EXISTS 사용)

   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS duration TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS budget_range TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS target_audience TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS participation_type TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS role TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS tech_stack JSONB;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS goal_ko TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS goal_en TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS key_features_ko JSONB;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS key_features_en JSONB;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS process_ko TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS process_en TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS technical_challenges_ko TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS technical_challenges_en TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS collaboration_tools TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS outcome_images JSONB;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS demo_link TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS metrics_ko JSONB;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS metrics_en JSONB;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS conclusion_ko TEXT;
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS conclusion_en TEXT;
   ```

4. **Run the Query**
   - Click the "Run" button (or press Ctrl/Cmd + Enter)
   - Wait for the success message

5. **Refresh Your Application**
   - Go back to your admin panel
   - Refresh the page (F5 or Ctrl/Cmd + R)
   - Try saving a portfolio again

## What These Columns Do

These columns add extended portfolio capabilities:

- **duration**: Project duration (e.g., "3 months")
- **budget_range**: Budget information
- **target_audience**: Target audience description
- **participation_type**: Individual/Team/Client project
- **role**: Your role in the project
- **tech_stack**: Technologies used (JSON array)
- **goal_ko/en**: Project goals (Korean/English)
- **key_features_ko/en**: Key features list (JSON arrays)
- **process_ko/en**: Development process description
- **technical_challenges_ko/en**: Technical challenges and solutions
- **collaboration_tools**: Tools used for collaboration
- **outcome_images**: Additional result images (JSON array)
- **demo_link**: Link to demo/live site
- **metrics_ko/en**: Project metrics (JSON arrays)
- **conclusion_ko/en**: Project conclusion

## Important Notes

✅ **Safe to run multiple times** - The script uses `IF NOT EXISTS`, so it won't cause errors if you run it again

✅ **Existing data is preserved** - This only adds new columns, it doesn't modify or delete existing data

✅ **No downtime required** - The migration can be run while the application is running

## Troubleshooting

### Clipboard Error
If you see a clipboard error like:
```
Failed to copy: NotAllowedError: Failed to execute 'writeText' on 'Clipboard'
```

This is a browser security feature. The system will automatically select the SQL text for you. Just press `Ctrl+C` (or `Cmd+C` on Mac) to copy it manually.

### SQL Execution Failed
If the SQL fails to execute:
1. Check that you're connected to the correct database
2. Verify you have admin permissions on the Supabase project
3. Try running the ALTER TABLE statements one by one

### Still Getting Errors
If you continue to see errors after running the migration:
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear your browser cache
3. Check the Supabase logs for any additional error details

## Prevention

To avoid this issue in the future, always check the `/utils/supabase/setup.sql` file when setting up a new environment. Run the complete setup script to ensure all tables and columns are properly created.
