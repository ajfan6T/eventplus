-- CreateTable
CREATE TABLE "CorporateInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "itPark" TEXT,
    "eventType" TEXT,
    "headcount" TEXT,
    "budgetBand" TEXT,
    "preferredAt" TEXT,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
