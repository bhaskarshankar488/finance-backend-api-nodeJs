import { createDatabase } from "./createDatabase.js";
import { execSync } from "child_process";
import {sequelize} from "../src/config/db.js";
import { seedAdmin } from "./seedAdmin.js"; 

const runSetup = async () => {
  try {
    console.log("🚀 Starting setup...");

    //  STEP 1: Create DB
    await createDatabase();

    //  STEP 2: Connect Sequelize
    await sequelize.authenticate();
    console.log(" DB Connected");

    // STEP 3: Run migrations (SYNC )
    console.log(" Running migrations...");
    execSync(
      "npx sequelize-cli db:migrate --config config/config.cjs",
      { stdio: "inherit" }
    );

    console.log(" Migrations completed");

    // STEP 4: Seed Admin
    await seedAdmin();

    console.log(" Setup completed successfully");

    process.exit(0);
  } catch (error) {
    console.error(" Setup failed:", error);
    process.exit(1);
  }
};

runSetup();