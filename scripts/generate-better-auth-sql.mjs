import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { getMigrations } from "better-auth/db/migration";
import { writeFileSync } from "node:fs";

const db = new Database(":memory:");
const auth = betterAuth({
  database: db,
  socialProviders: {
    google: { clientId: "x", clientSecret: "y" },
  },
  plugins: [
    magicLink({
      sendMagicLink: async () => {},
    }),
  ],
  user: { changeEmail: { enabled: true } },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
});

const { runMigrations } = await getMigrations(auth.options);
await runMigrations();

const tables = db
  .prepare(
    "SELECT sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
  )
  .all();

const indexes = db
  .prepare(
    "SELECT sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL ORDER BY name",
  )
  .all();

const lines = [
  "-- Better Auth tables for COMMERCE_DB (generated via getMigrations)",
  "-- Apply: wrangler d1 execute airona-commerce --local|--remote --file=./migrations/commerce/003_better_auth.sql",
  "",
  "PRAGMA foreign_keys = ON;",
  "",
];

for (const row of tables) {
  lines.push(`${row.sql};`, "");
}
for (const row of indexes) {
  lines.push(`${row.sql};`, "");
}

lines.push(
  "-- Commerce link to Better Auth user",
  "ALTER TABLE customers ADD COLUMN auth_user_id TEXT;",
  "CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_auth_user_id ON customers(auth_user_id) WHERE auth_user_id IS NOT NULL;",
  "",
);

writeFileSync(
  new URL("../migrations/commerce/003_better_auth.sql", import.meta.url),
  lines.join("\n"),
  "utf8",
);
console.log("Wrote migrations/commerce/003_better_auth.sql");
