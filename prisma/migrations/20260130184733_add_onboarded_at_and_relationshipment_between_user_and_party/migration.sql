/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `party` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `party` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "party" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onboardedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "party_userId_key" ON "party"("userId");

-- AddForeignKey
ALTER TABLE "party" ADD CONSTRAINT "party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
