-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('LEAD', 'CLIENTE', 'PROJETO');

-- CreateTable
CREATE TABLE "ClientStage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientStageItem" (
    "id" TEXT NOT NULL,
    "clientStageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" DOUBLE PRECISION NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientStageItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientStageItem" ADD CONSTRAINT "ClientStageItem_clientStageId_fkey" FOREIGN KEY ("clientStageId") REFERENCES "ClientStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
