import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const DB_NAME = 'LovEcommerce_v3';
const OUTPUT_DIR = path.resolve('../src/models');

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: DB_NAME,
});

// Step 1: Clean the output directory (delete old model files)
if (fs.existsSync(OUTPUT_DIR)) {
  const files = fs.readdirSync(OUTPUT_DIR);
  for (const file of files) {
    const filePath = path.join(OUTPUT_DIR, file);
    if (fs.statSync(filePath).isFile() && file.endsWith('.js')) {
      fs.unlinkSync(filePath);
    }
  }
} else {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const [tables] = await connection.query(`SHOW TABLES`);
const tableKey = `Tables_in_${DB_NAME}`;

const typeMap = {
  int: '0',
  varchar: '""',
  text: '""',
  timestamp: '""',
  enum: '""',
  date: '""',
  tinyint: 'false',
  json: '{}',
};

const sqlToJsDefault = (sqlType) => {
  const base = sqlType.toLowerCase().split('(')[0];
  return typeMap[base] ?? 'null';
};

// const formatClassName = (tableName) =>
//   tableName[0].toUpperCase() + tableName.slice(1);

for (const row of tables) {
  const tableName = row[tableKey];
  const [columns] = await connection.query(`DESCRIBE \`${tableName}\`;`);
  const className = tableName;

  const constructorFields = columns
    .map(
      (col) => `      ${col.Field} = ${sqlToJsDefault(col.Type)},`
    )
    .join('\n');

  const constructorBody = columns
    .map((col) => `    this.${col.Field} = ${col.Field};`)
    .join('\n');

  const model = `import db from "../config/knex.js";

class ${className} {
  constructor({
${constructorFields}
  }) {
${constructorBody}
  }

  static async getAll() {
    const rows = await db("${tableName}").select("*");
    return rows.map((r) => new ${className}(r));
  }

  static async getById(id) {
    const row = await db("${tableName}").where({ ${columns[0].Field}: id }).first();
    return row ? new ${className}(row) : null;
  }

  static async create(data) {
    const { ${columns[0].Field}, ...insert } = data;
    return db("${tableName}").insert(insert);
  }

  static async update(data) {
    const { ${columns[0].Field}, ...update } = data;
    return db("${tableName}").where({ ${columns[0].Field} }).update(update);
  }

  static async delete(id) {
    return db("${tableName}").where({ ${columns[0].Field}: id }).del();
  }
}

export default ${className};
`;

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${className}.js`),
    model,
    'utf8'
  );

  console.log(`✅ Generated model: ${className}.js`);
}

await connection.end();
console.log('🔌 Connection closed.');
