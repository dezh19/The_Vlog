const Database = require('better-sqlite3');
const crypto = require('crypto');

const db = new Database('dist/.tmp/data.db');

try {
  // Get the full-access token
  const token = db.prepare('SELECT id, access_key FROM strapi_api_tokens WHERE type = ?').get('full-access');
  
  if (token) {
    console.log('✓ Full Access Token Found!');
    console.log('  ID:', token.id);
    console.log('  Access Key:', token.access_key);
    console.log('');
    console.log('Use this in .env:');
    console.log('STRAPI_API_TOKEN=' + token.access_key);
  } else {
    console.log('No full-access token found');
  }
  
} catch(e) {
  console.error('Error:', e.message);
}
