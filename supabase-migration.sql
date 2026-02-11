-- FinMate Database Migration Script
-- Run this in Supabase SQL Editor

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  "emailVerified" TIMESTAMP,
  image TEXT,
  password TEXT,
  role TEXT DEFAULT 'PERSONAL',
  "companyName" TEXT,
  "onboardingComplete" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Account" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  scope TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  UNIQUE(provider, "providerAccountId")
);

CREATE TABLE IF NOT EXISTS "Session" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "VerificationToken" (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  UNIQUE(identifier, token)
);

CREATE TABLE IF NOT EXISTS "Income" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount FLOAT NOT NULL,
  frequency TEXT NOT NULL,
  "monthlyAmount" FLOAT,
  "dailyAmount" FLOAT,
  "reliabilityRating" INTEGER DEFAULT 5,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Transaction" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  amount FLOAT NOT NULL,
  type TEXT NOT NULL,
  "dayOfMonth" INTEGER,
  "transactionDate" TIMESTAMP DEFAULT now(),
  "monthlyAmount" FLOAT,
  "dailyAmount" FLOAT,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now(),
  "departmentId" TEXT
);

CREATE TABLE IF NOT EXISTS "Goal" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  "targetAmount" FLOAT NOT NULL,
  "currentAmount" FLOAT DEFAULT 0,
  "targetDate" TIMESTAMP NOT NULL,
  "isEmergencyFund" BOOLEAN DEFAULT false,
  "requiredAmount" FLOAT,
  "daysRemaining" INTEGER,
  "dailySaveRate" FLOAT,
  "weeklySaveRate" FLOAT,
  "goalType" TEXT DEFAULT 'PERSONAL_GOAL',
  "growthTarget" FLOAT,
  "isCompleted" BOOLEAN DEFAULT false,
  "completedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "GoalContribution" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "goalId" TEXT NOT NULL REFERENCES "Goal"(id) ON DELETE CASCADE,
  amount FLOAT NOT NULL,
  note TEXT,
  "createdAt" TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Department" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  "totalBudget" FLOAT NOT NULL,
  "efficiencyRating" INTEGER DEFAULT 5,
  description TEXT,
  headcount INTEGER,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "AIAnalysis" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "goalType" TEXT NOT NULL,
  "inputData" JSONB,
  suggestions JSONB,
  "rawResponse" TEXT,
  model TEXT DEFAULT 'gpt-4o-mini',
  "tokensUsed" INTEGER,
  "createdAt" TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "BudgetSummary" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "totalMonthlyIncome" FLOAT DEFAULT 0,
  "totalDailyIncome" FLOAT DEFAULT 0,
  "totalFixedExpenses" FLOAT DEFAULT 0,
  "totalVariableExpenses" FLOAT DEFAULT 0,
  "netMonthly" FLOAT DEFAULT 0,
  "netDaily" FLOAT DEFAULT 0,
  "savingsRate" FLOAT DEFAULT 0,
  "lastCalculatedAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"(email);
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"(role);
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Income_userId_idx" ON "Income"("userId");
CREATE INDEX IF NOT EXISTS "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX IF NOT EXISTS "Goal_userId_idx" ON "Goal"("userId");
CREATE INDEX IF NOT EXISTS "Department_userId_idx" ON "Department"("userId");

-- Success message
SELECT 'All tables created successfully!' as message;
