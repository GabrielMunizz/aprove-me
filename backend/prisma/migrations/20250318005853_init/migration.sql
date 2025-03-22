-- CreateTable
CREATE TABLE "AccountReceivable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    CONSTRAINT "AccountReceivable_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL
);
