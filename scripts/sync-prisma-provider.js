/*
  Sync Prisma datasource provider based on DATABASE_URL.
  - postgresql:// -> provider = "postgresql"
  - mysql://      -> provider = "mysql"
  Defaults to postgresql.
*/
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const envUrl = process.env.DATABASE_URL || '';

let provider = 'postgresql';
if (envUrl.startsWith('mysql://')) provider = 'mysql';
if (envUrl.startsWith('postgresql://')) provider = 'postgresql';

const schema = fs.readFileSync(schemaPath, 'utf8');
const updated = schema.replace(/provider\s*=\s*"(mysql|postgresql)"/g, `provider = "${provider}"`);

if (updated !== schema) {
  fs.writeFileSync(schemaPath, updated, 'utf8');
  console.log(`[sync-prisma-provider] Updated provider to ${provider}`);
} else {
  console.log('[sync-prisma-provider] No changes needed');
}


