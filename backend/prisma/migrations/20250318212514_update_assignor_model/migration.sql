/*
  Warnings:

  - You are about to drop the `AccountReceivable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AccountReceivable";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AccountPayable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    CONSTRAINT "AccountPayable_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
