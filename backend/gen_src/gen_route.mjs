import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toPascalCase(str) {
    return str.replace(/(^\w|_\w)/g, (match) =>
        match.replace("_", "").toUpperCase()
    );
}

function clearRoutesFolder(routeDir) {
    if (!fs.existsSync(routeDir)) return;
    const files = fs.readdirSync(routeDir);
    for (const file of files) {
        const filePath = path.join(routeDir, file);
        if (fs.lstatSync(filePath).isFile() && file.endsWith(".js")) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted: ${file}`);
        }
    }
    console.log(`🧹 Cleared existing routes in: ${routeDir}\n`);
}

async function generateRoute(tableName, outputDir) {
    const PascalName = toPascalCase(tableName);
    const camelName = tableName;
    const routeFile = `${camelName}.js`;

    const content = `import express from "express";
import {
    getAll${PascalName}s,
    get${PascalName}ById,
    create${PascalName},
    update${PascalName},
    delete${PascalName},
} from "../controllers/${camelName}.js";

const router = express.Router();

router.get("/${camelName}/get-all", getAll${PascalName}s);
router.get("/${camelName}/get-id/:id", get${PascalName}ById);
router.post("/${camelName}/create", create${PascalName});
router.put("/${camelName}/update/", update${PascalName});
router.delete("/${camelName}/delete/:id", delete${PascalName});

export default router;
`;

    const filePath = path.join(outputDir, routeFile);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Route generated: ${routeFile}`);
}

async function getAllTableNames(connection, databaseName) {
    const [rows] = await connection.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
        [databaseName]
    );
    return rows.map((row) => row.TABLE_NAME);
}

function generateMainRouteFile(routeNames, outputDir) {
    const importStatements = routeNames
        .map((name) => `import ${name}Route from "./${name}.js";`)
        .join("\n");

    const useStatements = routeNames
        .map((name) => `router.use(${name}Route);`)
        .join("\n");

    const content = `import express from "express";
${importStatements}

const router = express.Router();

${useStatements}

export default router;
`;

    const filePath = path.join(outputDir, "route.js");
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Aggregated route generated: route.js`);
}

async function main() {
    const dbConfig = {
        host: "localhost",
        user: "root",
        password: "root",
        database: "LovEcommerce_v3",
    };

    const routeDir = path.join(__dirname, "../src/routes");

    if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
    } else {
        clearRoutesFolder(routeDir);
    }

    const connection = await mysql.createConnection(dbConfig);

    try {
        const tableNames = await getAllTableNames(
            connection,
            dbConfig.database
        );

        for (const table of tableNames) {
            await generateRoute(table, routeDir);
        }

        // ✨ Create route.js to wrap them all
        generateMainRouteFile(tableNames, routeDir);
    } catch (err) {
        console.error("❌ Error during route generation:", err.message);
    } finally {
        await connection.end();
    }
}


main();