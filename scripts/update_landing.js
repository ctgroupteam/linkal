/**
 * Linkal AI - Zero-Git Live Website Updater
 * 
 * Run: node scripts/update_landing.js
 * Updates the live website content instantly in Supabase Storage with ZERO Git commits or pushes.
 */

const path = require('path');
const { createClient } = require(path.join(__dirname, '../Linkal Tool/node_modules/@supabase/supabase-js'));

const supabaseUrl = 'https://yuvkbugblplulrzrjamg.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dmtidWdibHBsdWxyenJqYW1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5Mzk2NTQ1MSwiZXhwIjoyMTA5NTQxNDUxfQ.wa3GU56LYGxXn-g8Ni6DE5hWIqkMCv733AHneJOG5pE';

const supabase = createClient(supabaseUrl, serviceKey);

async function updateLandingContent(customConfig = {}) {
  const defaultConfig = {
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
    siteName: "Linkal AI",
    announcement: "CV Websites & Wedding Card Websites : Lifetime",
    phoneDemo: {
      brandName: "Daily Fashion",
      username: "dailyfashion",
      verified: true,
      bio: "Men's Shirts & Jeans 👖👕",
      linkText: "dailyfashion.linkal.in",
      websiteUrl: "dailyfashion.linkal.in",
      stats: {
        posts: "148",
        followers: "58.4K",
        following: "216"
      },
      googleSearch: {
        query: "Daily Fashion",
        title: "Daily Fashion - Best Shirts & Jeans, Shop Online",
        url: "dailyfashion.linkal.in",
        snippet: "Shop trendy men's shirts, rugged denim & slim fit jeans at unbeatable prices. Free delivery across India. Direct WhatsApp ordering."
      }
    }
  };

  const finalConfig = { ...defaultConfig, ...customConfig };
  const jsonStr = JSON.stringify(finalConfig, null, 2);

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload('landing_config.json', Buffer.from(jsonStr), {
      contentType: 'application/json',
      upsert: true
    });

  if (error) {
    console.error('❌ Failed to update live website config:', error);
    process.exit(1);
  } else {
    console.log('✅ Live website content updated successfully in Supabase!');
    console.log('🌐 URL: https://yuvkbugblplulrzrjamg.supabase.co/storage/v1/object/public/uploads/landing_config.json');
    console.log('⚡ All visitors will see the updated content instantly without any Git push or Vercel rebuild.');
  }
}

if (require.main === module) {
  updateLandingContent();
}

module.exports = { updateLandingContent };
