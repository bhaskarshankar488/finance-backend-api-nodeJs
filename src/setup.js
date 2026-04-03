import { createDatabase } from "./config/dbInit.js";
import { exec } from "child_process";

const runSetup = async () => {
  // Step 1: Create DB
  await createDatabase();

  // Step 2: Run migrations
  exec("npx sequelize-cli db:migrate", (err, stdout, stderr) => {
    if (err) {
      console.error("Migration error:", err);
      return;
    }

    console.log(stdout);
    console.log("Migrations completed");
  });
};

runSetup();