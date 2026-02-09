/*
  Warnings:

  - You are about to drop the `ClientStage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientStageItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PipelineType" AS ENUM ('LEAD', 'CLIENTE', 'PROJETO');

-- DropForeignKey
ALTER TABLE "ClientStageItem" DROP CONSTRAINT "ClientStageItem_clientStageId_fkey";

-- DropTable
DROP TABLE "ClientStage";

-- DropTable
DROP TABLE "ClientStageItem";

-- DropEnum
DROP TYPE "EntityType";

-- CreateTable
CREATE TABLE "PipelineStage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "position" DOUBLE PRECISION NOT NULL,
    "pipelineType" "PipelineType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineStageItem" (
    "id" TEXT NOT NULL,
    "pipelineStageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" DOUBLE PRECISION NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineStageItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PipelineStageItem" ADD CONSTRAINT "PipelineStageItem_pipelineStageId_fkey" FOREIGN KEY ("pipelineStageId") REFERENCES "PipelineStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
