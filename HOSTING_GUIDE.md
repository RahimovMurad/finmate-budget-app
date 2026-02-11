# 🚀 FinMate Hosting Guide

## ✅ Proyekt Status - 95% Hazırdır

- ✅ Build uğurlu oldu 
- ✅ Metadata xətaları sazlandı
- ✅ PWA konfiqurasiyası hazır
- ✅ All packages updated

## 🌐 Hosting Platform Tövsiyələri

### 1. Vercel (Ən Yaxşı Seçim)
- **Üstünlüklər:** Next.js üçün nəzərdə tutulub, 0-konfiqurasiya, CI/CD
- **Database:** Supabase və ya Neon ilə inteqrasiya
- **Qiymət:** Hobby tier $0/ay (Proyekt üçün kifayətdir)
- **Addımlar:**
  1. GitHub repo-nu Vercel-ə bağla
  2. Environment variables əlavə et
  3. Deploy et

### 2. Netlify (Alternativ)
- **Üstünlüklər:** PWA dəstəyi yaxşı, form handling
- **Database:** External database lazımdır
- **Qiymət:** Starter tier $0/ay

### 3. Railway (All-in-One)
- **Üstünlüklər:** Database + Hosting birlikdə
- **Qiymət:** $5/ay-dan başlayır

## 📋 Zəruri Environment Variables

`.env` faylınızda bunlar olmalıdır:

```bash
# Database (Supabase/Neon/PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database?schema=public"

# Authentication
AUTH_SECRET="minimum-32-character-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# AI Features (Optional)
OPENAI_API_KEY="sk-your-openai-key"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🗄️ Database Qurulumu

### Supabase (Tövsiyə)
1. Supabase.com-da yeni project yarat
2. Project Settings > Database > Connection string-i kopyala
3. `DATABASE_URL`-ə yapışdır
4. Prisma migrationları işə sal:
   ```bash
   npx prisma db push
   ```

### Neon (Alternativ)
1. Neon.tech-də yeni PostgreSQL yarat
2. Connection string al
3. `DATABASE_URL`-ə əlavə et

## 🔧 Hostingə Hazırlıq Addımları

### 1. Environment Variables Yarat
```bash
# .env.local faylı yarat
cp .env.example .env.local
# Dəyərləri doldur
```

### 2. Database Migration
```bash
npx prisma generate
npx prisma db push
```

### 3. Production Test
```bash
npm run build
npm start
```

## 🚀 Vercel Deploy (Quick Start)

1. **Repo yükle:**
   ```bash
   git add .
   git commit -m "Ready for hosting"
   git push origin main
   ```

2. **Vercel-də:**
   - "Import Project" > GitHub seç
   - Repo-nu seç
   - Environment variables əlavə et
   - "Deploy"

3. **Post-deploy:**
   - Database migrationları işə sal
   - Test etmək

## 📱 PWA Features

Proyektiniz PWA kimi işləyəcək:
- ✅ Service Worker hazır
- ✅ Manifest faylı var
- ✅ Offline support
- ✅ Installable

## 🔒 Security

- ✅ HTTPS məcburidir
- ✅ Environment variables secure
- ✅ bcrypt password hashing
- ✅ JWT authentication

## 💰 Qiymət Proqnozu

- **Hosting:** $0-20/ay
- **Database:** $0-25/ay  
- **Domain:** $12/il (opsional)
- **Total:** $12-57/il

## 🎯 Növbəti Addımlar

1. ✅ Hosting platform seç (Vercel tövsiyə)
2. ✅ Database qur (Supabase)
3. ✅ Environment variables doldur
4. ✅ Deploy et
5. ✅ Test et və istifadəyə başla!

Proyektiniz production-a hazırdır! 🎉
