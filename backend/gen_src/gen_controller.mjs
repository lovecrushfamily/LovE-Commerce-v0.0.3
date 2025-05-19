import mysql from "mysql2";
import fs from "fs";
import path from "path";
import util from "util";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve("../src/controllers");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "LovEcommerce_v3", // 🔁 change to your database
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

const query = util.promisify(db.query).bind(db);

async function getTables() {
    const tables = await query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
  `);
    return tables.map((row) => row.TABLE_NAME);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
    return str
        .split("_")
        .map((word) => capitalize(word))
        .join("");
}

async function generateController(tableName) {
    const PascalName = toPascalCase(tableName); // e.g., "user_account" → "UserAccount"
    const camelName = tableName; // assuming model name == table name
    const schemaName = `${PascalName}Schema`; // imported from ../schemas/
    const controllerFile = `${tableName}.js`; // file name

    const content = `import ${PascalName} from "../models/${camelName}.js";
import { ${schemaName} } from "../schemas/${camelName}.js";

// Get all ${tableName}
export const getAll${PascalName}s = async (req, res) => {
    try {
        const data = await ${PascalName}.getAll();
        if (data.length === 0) {
            return res.status(404).send("No ${tableName} found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get ${tableName} by ID
export const get${PascalName}ById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ${PascalName}.getById(id);
        if (!item) {
            return res.status(404).send("${PascalName} not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new ${tableName}
export const create${PascalName} = async (req, res) => {
    try {
        //const { error } = await ${schemaName}.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await ${PascalName}.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing ${tableName}
export const update${PascalName} = async (req, res) => {
    try {
        //const { error } = await ${schemaName}.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await ${PascalName}.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("${PascalName} updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete ${tableName}
export const delete${PascalName} = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ${PascalName}.delete(id);
        if (deleted === 0) {
            return res.status(404).send("${PascalName} not found!");
        }
        return res.status(200).send("${PascalName} deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
`;

    const outputDir = path.join(__dirname, "../src/controllers");

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const filePath = path.join(outputDir, controllerFile);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Controller generated: ${controllerFile}`);
}

(async () => {
    try {
        const tables = await getTables();
        for (const table of tables) {
            await generateController(table);
        }
        db.end();
    } catch (err) {
        console.error("❌ Error generating controllers:", err);
        db.end();
    }
})();
