/*
  Warnings:

  - You are about to drop the column `status` on the `party` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PartyTypeStatus" AS ENUM ('NOVO', 'SUSPENSO', 'CONTATO', 'INTERESSE', 'PERDA');

-- AlterTable
ALTER TABLE "party" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "party_type" ADD COLUMN     "status" "PartyTypeStatus" NOT NULL DEFAULT 'NOVO';

-- DropEnum
DROP TYPE "PartyStatus";
