/*
  Warnings:

  - You are about to drop the column `url` on the `Design` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Design` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Design_url_key";

-- AlterTable
ALTER TABLE "Design" DROP COLUMN "url",
ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Design_key_key" ON "Design"("key");
