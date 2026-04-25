const Database = require('better-sqlite3');
const db = new Database('dist/.tmp/data.db');

try {
  // Check for public role
  let publicRole = db.prepare('SELECT id FROM up_roles WHERE type = ?').get('public');
  
  if (!publicRole) {
    console.log('Creating public role...');
    const result = db.prepare(`
      INSERT INTO up_roles (name, description, type, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run('Public', 'Public access role', 'public', new Date().toISOString(), new Date().toISOString());
    publicRole = { id: result.lastInsertRowid };
  }
  
  console.log('Public role ID:', publicRole.id);
  
  // Grant all API permissions to public role
  const actions = [
    'api::hero.hero.find',
    'api::hero.hero.findOne',
    'api::about.about.find',
    'api::about.about.findOne',
    'api::footer.footer.find',
    'api::footer.footer.findOne',
    'api::booking.booking.find',
    'api::booking.booking.findOne',
    'api::content-feature.content-feature.find',
    'api::content-feature.content-feature.findOne',
    'api::testimony.testimony.find',
    'api::testimony.testimony.findOne',
    'api::event.event.find',
    'api::event.event.findOne',
  ];
  
  console.log('Granting permissions to public role...');
  for (const action of actions) {
    try {
      // Check if permission exists
      const perm = db.prepare('SELECT id FROM up_permissions WHERE action = ?').get(action);
      if (!perm) {
        console.log('  Creating permission:', action);
        db.prepare(`
          INSERT INTO up_permissions (action, controller, action_type, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?)
        `).run(action, action.split('.')[1], 'find', new Date().toISOString(), new Date().toISOString());
      }
    } catch(e) {
      // Permission might already exist
    }
  }
  
  console.log('✓ Public role configured');
  
} catch(e) {
  console.error('Error:', e.message);
  console.error(e.stack);
}
