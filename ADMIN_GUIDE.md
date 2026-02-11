# 🛠️ FinMate Admin Guide

## 📊 İstifadəçi Məlumatları

### 🗄️ Supabase Database (Əsas məlumatlar)

**Bütün istifadəçi məlumatları Supabase-dədir:**

1. **Supabase Dashboard-a gir:**
   - supabase.com > Projectiniz
   - Table Editor

2. **Əsas cədvəllər:**
   - `users` - Qeydiyyat, login, profil məlumatları
   - `goals` - İstifadəçi hədəfləri
   - `income` - Gəlir məlumatları
   - `transactions` - Xərc məlumatları
   - `departments` - Company şöbələri
   - `ai_analyses` - AI analizləri

### 🔍 İstifadəçi Statistikaları

**SQL Queries:**
```sql
-- Ümumi istifadəçi sayı
SELECT COUNT(*) as total_users FROM users;

-- Personal vs Company istifadəçilər
SELECT role, COUNT(*) as count FROM users GROUP BY role;

-- Son qeydiyyat olanlar
SELECT email, created_at FROM users 
ORDER BY created_at DESC LIMIT 10;

-- Aktiv hədəflər
SELECT COUNT(*) as active_goals 
FROM goals WHERE is_completed = false;
```

### 📈 Real-time Monitoring

**Vercel Logs (API monitoring):**
- Vercel Dashboard > Project > Functions > Logs
- API request-ları, error-ları görə bilərsiniz

**Supabase Realtime:**
- Supabase > Database > Replication
- Realtime updates-i aktiv edə bilərsiniz

### 🔧 Admin Panel (Əgər lazımdırsa)

**Admin səhifəsi yaratmaq üçün:**
1. Yeni route: `/app/admin/page.tsx`
2. Database-dən məlumatları çəkin
3. Statistics dashboard qurun

**Nümunə admin endpoint:**
```typescript
// app/api/admin/stats/route.ts
export async function GET() {
  const userCount = await prisma.user.count();
  const goalCount = await prisma.goal.count();
  
  return Response.json({
    users: userCount,
    goals: goalCount
  });
}
```

### 🛡️ Təhlükəsizlik

**Həssas məlumatlar:**
- Şifrələr hash-lənib (bcrypt)
- Environment variables secure
- API routes protected

**Backup:**
- Supabase avtomatik backup edir
- Settings > Database > Backups

---

**Qısa məlumat:**
- ✅ Bütün data Supabase-dədir
- ✅ Real-time monitoring mümkündür  
- ✅ SQL queries ilə analiz edə bilərsiniz
- ✅ Vercel logs-da API monitoring
