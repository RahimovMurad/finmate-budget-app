# 🚀 FinMate Deploy Addımları

## ✅ ADDIM 1: GitHub (Hazırdır)
- ✅ Git repo yaradıldı
- ✅ Fayllar commit edildi

## 🔄 ADDIM 2: GitHub Repository Yarat

### 1. GitHub-a gir:
1. [github.com](https://github.com) aç
2. "Sign in" > account-a gir
3. "New repository" bas

### 2. Repository qur:
- **Repository name:** `finmate-budget-app`
- **Description:** `FinMate - Gamified budget planning app`
- **Public/Private:** Public seç (pulsuz)
- "Create repository" bas

### 3. Kodları yükle:
GitHub səhifəsində göstərilən əmrləri işlət:
```bash
git remote add origin https://github.com/USERNAME/finmate-budget-app.git
git branch -M main
git push -u origin main
```

## 🗄️ ADDIM 3: Supabase Database

### 1. Supabase account:
1. [supabase.com](https://supabase.com) aç
2. "Sign Up" > GitHub ilə qeydiyyat
3. "New Project" bas

### 2. Project yarat:
- **Organization:** "FinMate"
- **Project name:** "budgetpath"
- **Database Password:** Güclü şifrə yadda saxla
- **Region:** Ən yaxın region seç
- "Create new project" bas

### 3. Connection string al:
1. Project Settings > Database
2. **Connection string** > **URI** kopyala
3. Bu formatda olacaq:
```
postgresql://postgres:[ŞİFRƏ]@db.[PROJECT].supabase.co:5432/postgres
```

## 🚀 ADDIM 4: Vercel Deploy

### 1. Vercel account:
1. [vercel.com](https://vercel.com) aç
2. "Sign Up" > GitHub ilə qeydiyyat

### 2. Project import:
1. "Add New..." > "Project"
2. GitHub repo-nu seç (`finmate-budget-app`)
3. "Deploy" bas

### 3. Environment variables əlavə et:
Vercel dashboard > Settings > Environment Variables:
```
DATABASE_URL = (Supabase connection string)
AUTH_SECRET = a2c4c058fa1b7f82dd77b78d4061b42d05839dc11824d3c1531a94015e60297f
NEXTAUTH_URL = (https://your-domain.vercel.app)
```

### 4. Redeploy:
Environment variables əlavə etdikdən sonra "Redeploy" bas.

## 🎯 ADDIM 5: Database Migration

Deploy olduqdan sonra:
1. Vercel dashboard > Logs
2. Terminal aç: `npx prisma db push`
3. Database tables yaradılacaq

## 🎉 Nəticə
10-15 dəqiqəyə proyektiniz online olar!

---
**Qısa linklər:**
- GitHub: github.com
- Supabase: supabase.com  
- Vercel: vercel.com
