// Database setup helper
const crypto = require('crypto');

// Generate random secret
function generateSecret() {
  return crypto.randomBytes(32).toString('hex');
}

console.log('=== FinMate Database Setup ===\n');

console.log('1. SUPABASE SETUP:');
console.log('   • Go to: https://supabase.com');
console.log('   • Create new project named "budgetpath"');
console.log('   • Copy the Connection String from Project Settings > Database\n');

console.log('2. ENVIRONMENT VARIABLES:');
console.log('   AUTH_SECRET:', generateSecret());
console.log('   (Copy this secret for Vercel)\n');

console.log('3. VERCEL DEPLOY:');
console.log('   • Go to: https://vercel.com');
console.log('   • Import your GitHub repository');
console.log('   • Add environment variables in Vercel dashboard');
console.log('   • Deploy!\n');

console.log('4. AFTER DEPLOY:');
console.log('   • Run: npx prisma db push');
console.log('   • Test your app at the deployed URL\n');

console.log('Need help? Check HOSTING_GUIDE.md');
