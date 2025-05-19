import fs from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Edit your database connection here
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "LovEcommerce_v3",
};

const getMockValue = (type) => {
  if (type.includes("int")) return 1;
  if (type.includes("varchar") || type.includes("text")) return "sample_text";
  if (type.includes("enum")) return "sample_enum";
  if (type.includes("timestamp") || type.includes("date")) return "2025-01-01T00:00:00Z";
  return null;
};

const generateTestAPI = async (tableName, columns, outputDir) => {
  const filePath = path.join(outputDir, `${tableName}.http`);

  const postBody = {};
  const putBody = {};

  for (const col of columns) {
    if (col.Extra.includes("auto_increment")) continue;

    const mock = getMockValue(col.Type);
    const fieldName = col.Field;

    // For password, use 'password_' if it matches naming convention
    const keyName = fieldName === "password" ? "password_" : fieldName;

    postBody[keyName] = mock;
    putBody[keyName] = mock;
  }

  // Include primary key in PUT request body if found
  const primaryKeyCol = columns.find(col => col.Key === "PRI");
  if (primaryKeyCol) {
    putBody[primaryKeyCol.Field] = 1;
  }

  const postStr = JSON.stringify(postBody, null, 2);
  const putStr = JSON.stringify(putBody, null, 2);

  const content = `
### Get all ${tableName}s
GET http://localhost:3000/api/${tableName}/get-all


### Get an ${tableName} by ID
GET http://localhost:3000/api/${tableName}/get-id/1



### Create a new ${tableName}
POST http://localhost:3000/api/${tableName}/create
Content-Type: application/json

${postStr}


### Update an ${tableName}
PUT http://localhost:3000/api/${tableName}/update/
Content-Type: application/json

${putStr}

###


## Delete an ${tableName} by ID
DELETE http://localhost:3000/api/${tableName}/delete/1
  `.trim();

  await fs.writeFile(filePath, content);
  console.log(`✅ Generated: ${filePath}`);
};

const main = async () => {
  const outputDir = path.join(__dirname, "http_testcases");
  await fs.mkdir(outputDir, { recursive: true });

  const conn = await mysql.createConnection(dbConfig);
  const [tables] = await conn.execute("SHOW TABLES");

  for (const row of tables) {
    const tableName = Object.values(row)[0];
    const [columns] = await conn.execute(`SHOW COLUMNS FROM \`${tableName}\``);
    await generateTestAPI(tableName, columns, outputDir);
  }

  await conn.end();
};

main().catch(console.error);
