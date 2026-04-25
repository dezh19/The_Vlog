const Database = require('better-sqlite3');
const crypto = require('crypto');

const db = new Database('dist/.tmp/data.db');

try {
  // View existing tokens
  console.log('Existing API Tokens:');
  const tokens = db.prepare("SELECT id, document_id, name, type, expires_at, last_used_at FROM strapi_api_tokens").all();
  tokens.forEach(t => {
    console.log(`  ID: ${t.id}, Name: ${t.name}, Type: ${t.type}, Expires: ${t.expires_at}, Last Used: ${t.last_used_at}`);
  });
  console.log('');
  
  // Create new token
  const newTokenKey = crypto.randomBytes(128).toString('hex');
  const now = new Date().toISOString();
  const docId = crypto.randomUUID();
  
  // This is just the readable key - Strapi encrypts it
  const accessKey = crypto.randomBytes(32).toString('hex');
  
  const stmt = db.prepare(`
    INSERT INTO strapi_api_tokens (
      document_id, name, description, type, access_key, encrypted_key,
      created_at, updated_at, published_at, locale
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    docId,
    'CMS Full Access',
    'Full access token for CMS API',
    'full-access',
    accessKey,
    newTokenKey,
    now,
    now,
    now,
    null
  );
  
  console.log('New API Token Created!');
  console.log('Token ID:', result.lastInsertRowid);
  console.log('');
  console.log('Token Key (for .env):');
  console.log(newTokenKey);
  console.log('');
  console.log('Update your .env file with:');
  console.log('STRAPI_API_TOKEN=' + newTokenKey);
  
} catch(e) {
  console.error('Error:', e.message);
  console.error(e.stack);
}
