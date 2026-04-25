const Database = require('better-sqlite3');
const db = new Database('dist/.tmp/data.db');

try {
  console.log('Setting up public access for API endpoints...');
  
  // Get or create public role
  let publicRole = db.prepare('SELECT id FROM up_roles WHERE type = ?').get('public');
  let publicRoleId = publicRole?.id;
  
  if (!publicRoleId) {
    console.log('Creating public role...');
    const result = db.prepare(`
      INSERT INTO up_roles (name, description, type, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run('Public', 'Public access role', 'public', new Date().toISOString(), new Date().toISOString());
    publicRoleId = result.lastInsertRowid;
  }
  
  console.log('Public role ID:', publicRoleId);
  
  // List of API endpoints to make public
  const endpoints = [
    'api::hero.hero.find',
    'api::about.about.find', 
    'api::footer.footer.find',
    'api::booking.booking.find',
    'api::content-feature.content-feature.find',
    'api::testimony.testimony.find',
    'api::event.event.find',
  ];
  
  for (const action of endpoints) {
    try {
      // Check if permission exists
      let perm = db.prepare('SELECT id FROM up_permissions WHERE action = ?').get(action);
      if (!perm) {
        console.log('  Creating permission for:', action);
        const permResult = db.prepare(`
          INSERT INTO up_permissions (action, created_at, updated_at)
          VALUES (?, ?, ?)
        `).run(action, new Date().toISOString(), new Date().toISOString());
        perm = { id: permResult.lastInsertRowid };
      }
      
      // Link permission to public role
      try {
        db.prepare(`
          INSERT INTO up_permissions_role_lnk (permission_id, role_id)
          VALUES (?, ?)
        `).run(perm.id, publicRoleId);
        console.log('  ✓ Granted:', action);
      } catch(e) {
        if (!e.message.includes('UNIQUE')) {
          throw e;
        }
      }
    } catch(e) {
      console.log('  (skipping', action + ')');
    }
  }
  
  console.log('');
  console.log('✓ Public access configured!');
  
} catch(e) {
  console.error('Error:', e.message);
}
