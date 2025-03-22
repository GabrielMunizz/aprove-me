/*
  Warnings:

  - You are about to drop the column `deleted` on the `AccountPayable` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccountPayable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AccountPayable_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccountPayable" ("assignor_id", "emissionDate", "id", "value") SELECT "assignor_id", "emissionDate", "id", "value" FROM "AccountPayable";
DROP TABLE "AccountPayable";
ALTER TABLE "new_AccountPayable" RENAME TO "AccountPayable";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
