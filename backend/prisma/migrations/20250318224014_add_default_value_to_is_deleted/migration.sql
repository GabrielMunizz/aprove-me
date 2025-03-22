/*
  Warnings:

  - You are about to drop the column `deleted` on the `Assignor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Assignor" ("document", "email", "id", "name", "phone") SELECT "document", "email", "id", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
