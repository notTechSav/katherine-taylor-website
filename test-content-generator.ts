/**
 * Test script for AI Content Generation
 * Run this to verify everything works!
 * 
 * Usage: pnpm tsx test-content-generator.ts
 */

async function testContentGeneration() {
  const baseUrl = 'http://localhost:8080';

  console.log('🧪 Testing AI Content Generation System\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Test 1: Health check
  console.log('1️⃣  Testing health check...');
  try {
    const healthRes = await fetch(`${baseUrl}/api/content/health`);
    const health = await healthRes.json();
    console.log('   ✅ Health check passed:', health);
    console.log('');
  } catch (error) {
    console.error('   ❌ Health check failed. Is your server running? (pnpm dev)');
    console.error('   Error:', error);
    return;
  }

  // Test 2: Generate single service description
  console.log('2️⃣  Generating luxury service description...');
  try {
    const generateRes = await fetch(`${baseUrl}/api/content/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceName: 'Bespoke Jewelry Consultation',
        duration: '90 minutes',
        price: 'Complimentary',
        location: 'Union Square Private Salon',
        highlights: [
          'One-on-one with master jeweler',
          'Champagne service',
          'Private viewing room',
          'Personalized design sketches'
        ],
        targetKeywords: [
          'San Francisco bespoke jewelry',
          'luxury jewelry consultation',
          'UHNW jewelry service'
        ]
      }),
    });

    const result = await generateRes.json();
    
    if (result.success) {
      console.log('   ✅ Content generated successfully!\n');
      console.log('   📝 Luxury Description (first 200 chars):');
      console.log('   ' + result.data.luxuryDescription.substring(0, 200) + '...\n');
      console.log('   🔍 SEO Meta Title:');
      console.log('   ' + result.data.metaTags.title + '\n');
      console.log('   📊 Full response saved to test-output.json');
      
      // Save to file for review
      const fs = await import('fs');
      fs.writeFileSync('test-output.json', JSON.stringify(result, null, 2));
    } else {
      console.error('   ❌ Generation failed:', result);
    }
  } catch (error: any) {
    console.error('   ❌ Generation error:', error.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✨ Test complete! Check test-output.json for full results.\n');
}

// Run test
testContentGeneration().catch(console.error);


