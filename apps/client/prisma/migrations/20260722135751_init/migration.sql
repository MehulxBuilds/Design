-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('UPLOADTHINGS', 'CFR2', 'AWSS3');

-- CreateTable
CREATE TABLE "AccessKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "block" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Design" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "provider" "Provider" NOT NULL DEFAULT 'AWSS3',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessKey_key_key" ON "AccessKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Design_url_key" ON "Design"("url");
