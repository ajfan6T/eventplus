-- CreateTable
CREATE TABLE "EventCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gradient" JSONB NOT NULL,
    "icon" TEXT NOT NULL,
    "popularBudget" TEXT NOT NULL,
    "avgGuests" TEXT NOT NULL,
    "vendorTypes" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Vendor" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VendorPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "unit" TEXT,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "features" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "VendorPackage_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VendorReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendorId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "event" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VendorReview_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "quote" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Event" (
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
    "isDemo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "ChecklistTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "taskKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "dueLabel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "aiSuggested" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChecklistTask_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BudgetLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "allocated" INTEGER NOT NULL,
    "spent" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "BudgetLine_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadKey" TEXT NOT NULL,
    "vendorId" TEXT,
    "customer" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "receivedAt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lead_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalendarBooking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_slug_key" ON "EventCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_slug_key" ON "Vendor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_leadKey_key" ON "Lead"("leadKey");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarBooking_bookingKey_key" ON "CalendarBooking"("bookingKey");
