import { exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import util from "util";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const run = util.promisify(exec);

const files = ["gen_model.mjs", "gen_controller.mjs", "gen_route.mjs"];

async function runGenerators() {
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    try {
      console.log(`\n▶️ Running ${file}...`);
      const { stdout, stderr } = await run(`node "${filePath}"`);

      if (stdout.trim()) {
        console.log(stdout.trim());
      }

      if (stderr.trim()) {
        console.error(`⚠️ Error output from ${file}:\n${stderr}`);
      }

      console.log(`✅ Finished: ${file}`);
    } catch (err) {
      console.error(`❌ Failed while running ${file}`);
      console.error(err.message || err);
      process.exit(1);
    }
  }

  console.log(`\n🎉 All generation steps completed successfully!\n`);
}

runGenerators();
