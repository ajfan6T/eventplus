-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'family',
    "city" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "coupleNames" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "daysAway" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "totalBudget" INTEGER NOT NULL,
    "spent" INTEGER NOT NULL,
    "booked" INTEGER NOT NULL,
    "shortlisted" INTEGER NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("booked", "coupleNames", "date", "dateLabel", "daysAway", "guests", "id", "isDemo", "location", "shortlisted", "spent", "totalBudget", "type") SELECT "booked", "coupleNames", "date", "dateLabel", "daysAway", "guests", "id", "isDemo", "location", "shortlisted", "spent", "totalBudget", "type" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_Vendor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "startingPrice" INTEGER NOT NULL,
    "priceUnit" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "responseTime" TEXT NOT NULL,
    "bookings" INTEGER NOT NULL,
    "yearsActive" INTEGER NOT NULL,
    "gradient" JSONB NOT NULL,
    "services" JSONB NOT NULL,
    "highlights" JSONB NOT NULL,
    "serviceAreas" JSONB NOT NULL,
    "gallerySeeds" JSONB NOT NULL,
    "eventTypes" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vendor" ("about", "bookings", "category", "categoryLabel", "city", "createdAt", "district", "eventTypes", "gallerySeeds", "gradient", "highlights", "id", "name", "order", "priceUnit", "rating", "responseTime", "reviewCount", "serviceAreas", "services", "slug", "startingPrice", "tagline", "verified", "yearsActive") SELECT "about", "bookings", "category", "categoryLabel", "city", "createdAt", "district", "eventTypes", "gallerySeeds", "gradient", "highlights", "id", "name", "order", "priceUnit", "rating", "responseTime", "reviewCount", "serviceAreas", "services", "slug", "startingPrice", "tagline", "verified", "yearsActive" FROM "Vendor";
DROP TABLE "Vendor";
ALTER TABLE "new_Vendor" RENAME TO "Vendor";
CREATE UNIQUE INDEX "Vendor_slug_key" ON "Vendor"("slug");
CREATE UNIQUE INDEX "Vendor_userId_key" ON "Vendor"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
