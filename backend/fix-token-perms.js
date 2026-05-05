const Database = require('better-sqlite3');
const db = new Database('dist/.tmp/data.db');

try {
  // Check token
  const token = db.prepare('SELECT id, name, type FROM strapi_api_tokens WHERE type = ?').get('full-access');
  console.log('Full-access token:', token);
  
  // Check token permissions
  const perms = db.prepare(`
    SELECT perm.* FROM strapi_api_token_permissions perm
    WHERE perm.id IN (
      SELECT api_token_permission_id FROM strapi_api_token_permissions_token_lnk
      WHERE api_token_id = ?
    )
  `).all(token.id);
  
  console.log('Token has', perms.length, 'permissions');
  perms.forEach(p => {
    console.log('  -', p.action);
  });
  
  // Create full access permissions
  if (perms.length === 0) {
    console.log('');
    console.log('Creating full-access permissions for token...');
    
    const now = new Date().toISOString();
    const docId = require('crypto').randomUUID();
    
    // Insert permission
    const permResult = db.prepare(`
      INSERT INTO strapi_api_token_permissions (document_id, action, created_at, updated_at)
      VALUES (?, ?, ?, ?)
    `).run(docId, 'admin::api-tokens.manage', now, now);
    
    const permId = permResult.lastInsertRowid;
    
    // Link permission to token
    db.prepare(`
      INSERT INTO strapi_api_token_permissions_token_lnk (api_token_permission_id, api_token_id)
      VALUES (?, ?)
    `).run(permId, token.id);
    
    console.log('✓ Added full-access permission to token');
  }
  
} catch(e) {
  console.error('Error:', e.message);
  console.error(e.stack);
}
