/*
  Warnings:

  - You are about to drop the `PipelineStage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PipelineStageItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `party` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PipelineStageItem" DROP CONSTRAINT "PipelineStageItem_pipelineStageId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_partyId_fkey";

-- DropForeignKey
ALTER TABLE "party" DROP CONSTRAINT "party_userId_fkey";

-- DropForeignKey
ALTER TABLE "party_address" DROP CONSTRAINT "party_address_partyId_fkey";

-- DropForeignKey
ALTER TABLE "party_phone" DROP CONSTRAINT "party_phone_partyId_fkey";

-- DropForeignKey
ALTER TABLE "party_type" DROP CONSTRAINT "party_type_partyId_fkey";

-- DropTable
DROP TABLE "PipelineStage";

-- DropTable
DROP TABLE "PipelineStageItem";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "party";

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "description" TEXT,
    "companyName" TEXT,
    "fantasyName" TEXT,
    "stateRegistration" TEXT,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_pipeline_stage" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "position" DOUBLE PRECISION NOT NULL,
    "pipelineType" "PipelineType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pipeline_stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_pipeline_stage_item" (
    "id" TEXT NOT NULL,
    "pipelineStageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" DOUBLE PRECISION NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pipeline_stage_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "deadlineDate" TIMESTAMP(3) NOT NULL,
    "priority" "PriorityStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Party_publicId_key" ON "Party"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Party_cpf_key" ON "Party"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Party_cnpj_key" ON "Party"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Party_userId_key" ON "Party"("userId");

-- CreateIndex
CREATE INDEX "Party_publicId_idx" ON "Party"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "project_publicId_key" ON "project"("publicId");

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_type" ADD CONSTRAINT "party_type_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_phone" ADD CONSTRAINT "party_phone_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_address" ADD CONSTRAINT "party_address_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_pipeline_stage_item" ADD CONSTRAINT "client_pipeline_stage_item_pipelineStageId_fkey" FOREIGN KEY ("pipelineStageId") REFERENCES "client_pipeline_stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
