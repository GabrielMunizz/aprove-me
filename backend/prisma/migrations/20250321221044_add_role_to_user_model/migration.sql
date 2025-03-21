-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Users" ("id", "login", "password") SELECT "id", "login", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
