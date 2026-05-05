const Database = require('better-sqlite3');
const db = new Database('dist/.tmp/data.db');

try {
  // First, create a super admin role if it doesn't exist
  const existingRole = db.prepare('SELECT id FROM admin_roles WHERE code = ?').get('super-admin');
  let roleId = existingRole?.id;

  if (!roleId) {
    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO admin_roles (name, code, created_at, updated_at)
      VALUES (?, ?, ?, ?)
    `).run('Super Admin', 'super-admin', now, now);
    roleId = result.lastInsertRowid;
    console.log('Created super-admin role:', roleId);
  } else {
    console.log('Super admin role already exists:', roleId);
  }

  // Assign role to user
  try {
    db.prepare(`
      INSERT INTO admin_users_roles_lnk (user_id, role_id, user_ord, role_ord)
      VALUES (?, ?, ?, ?)
    `).run(1, roleId, 0, 0);
    console.log('✓ Admin user now has super admin role');
  } catch(e) {
    if (e.message.includes('UNIQUE')) {
      console.log('✓ Admin user already has super admin role');
    } else {
      throw e;
    }
  }
} catch(e) {
  console.error('Error:', e.message);
}
