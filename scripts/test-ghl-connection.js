#!/usr/bin/env node
/**
 * Test GoHighLevel API Connection
 * Fetches pipelines and opportunities to help configure integration
 */

require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const BASE_URL = 'https://services.leadconnectorhq.com';

async function testGHLConnection() {
  console.log('\n🔍 Testing GoHighLevel Connection...\n');
  console.log('Configuration:');
  console.log(`  Location ID: ${LOCATION_ID}`);
  console.log(`  API Key: ${API_KEY ? API_KEY.substring(0, 20) + '...' : 'NOT SET'}\n`);

  if (!API_KEY || !LOCATION_ID) {
    console.error('❌ Error: Missing GHL_API_KEY or GHL_LOCATION_ID in .env.local');
    process.exit(1);
  }

  try {
    // Test 1: Fetch Pipelines
    console.log('📋 Fetching Pipelines...');
    const pipelinesResponse = await fetch(
      `${BASE_URL}/opportunities/pipelines?locationId=${LOCATION_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!pipelinesResponse.ok) {
      const errorText = await pipelinesResponse.text();
      console.error(`❌ Pipelines API Error (${pipelinesResponse.status}):`, errorText);

      if (pipelinesResponse.status === 401) {
        console.error('\n💡 Authentication failed. Please verify:');
        console.error('   1. Your API key is correct');
        console.error('   2. The API key has not expired');
        console.error('   3. The location ID matches your GHL account\n');
      }

      return;
    }

    const pipelinesData = await pipelinesResponse.json();
    console.log('✅ Successfully connected to GHL!\n');

    if (pipelinesData.pipelines && pipelinesData.pipelines.length > 0) {
      console.log(`Found ${pipelinesData.pipelines.length} pipeline(s):\n`);

      pipelinesData.pipelines.forEach((pipeline, index) => {
        console.log(`Pipeline ${index + 1}: ${pipeline.name}`);
        console.log(`  ID: ${pipeline.id}`);
        console.log(`  Stages:`);

        if (pipeline.stages && pipeline.stages.length > 0) {
          pipeline.stages.forEach((stage, stageIndex) => {
            console.log(`    ${stageIndex + 1}. ${stage.name} (ID: ${stage.id})`);
          });
        }
        console.log('');
      });

      // Generate .env format
      console.log('\n📝 Add these to your .env.local:\n');
      const firstPipeline = pipelinesData.pipelines[0];
      console.log(`GHL_PIPELINE_ID=${firstPipeline.id}`);

      if (firstPipeline.stages && firstPipeline.stages.length > 0) {
        console.log('\n# Pipeline Stages');
        firstPipeline.stages.forEach((stage) => {
          const envName = stage.name.toUpperCase().replace(/[^A-Z0-9]/g, '_');
          console.log(`GHL_STAGE_${envName}=${stage.id}`);
        });
      }
      console.log('');

    } else {
      console.log('⚠️  No pipelines found in this location.');
      console.log('   You may need to create a pipeline in GoHighLevel first.\n');
    }

    // Test 2: Try to fetch a contact (to verify permissions)
    console.log('\n🔍 Testing Contact API access...');
    const contactsResponse = await fetch(
      `${BASE_URL}/contacts/?locationId=${LOCATION_ID}&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        }
      }
    );

    if (contactsResponse.ok) {
      console.log('✅ Contact API access verified\n');
    } else {
      console.log('⚠️  Contact API returned:', contactsResponse.status, contactsResponse.statusText);
      console.log('   This may indicate limited API permissions\n');
    }

  } catch (error) {
    console.error('❌ Error testing GHL connection:', error.message);
    console.error('\nFull error:', error);
  }
}

// Run the test
testGHLConnection().catch(console.error);
