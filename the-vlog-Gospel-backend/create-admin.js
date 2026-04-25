const Database = require('better-sqlite3');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const db = new Database('dist/.tmp/data.db');

try {
  // Create admin user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('admin@123', salt);
  const now = new Date().toISOString();
  const docId = crypto.randomUUID();
  
  const adminStmt = db.prepare(`
    INSERT INTO admin_users (
      document_id, firstname, lastname, username, email, password,
      is_active, blocked, prefered_language, created_at, updated_at, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = adminStmt.run(
    docId,
    'Admin',
    'User',
    'admin',
    'admin@example.com',
    hash,
    1, // is_active
    0, // not blocked
    null, // preferred language
    now,
    now,
    now
  );
  
  console.log('✓ Admin user created!');
  console.log('  ID:', result.lastInsertRowid);
  console.log('  Email: admin@example.com');
  console.log('  Password: admin@123');
  console.log('');
  
  // Note: You'll need to restart Strapi and login to generate a proper API token through the admin panel
  console.log('✓ Next steps:');
  console.log('  1. Restart Strapi');
  console.log('  2. Go to http://localhost:1337/admin');
  console.log('  3. Login with admin@example.com / admin@123');
  console.log('  4. Go to Settings → API Tokens → Create new API token');
  console.log('  5. Create a Full Access token');
  console.log('  6. Update .env with the token');
  
} catch(e) {
  if (e.message.includes('UNIQUE constraint failed')) {
    console.log('Admin user already exists');
  } else {
    console.error('Error:', e.message);
  }
}
