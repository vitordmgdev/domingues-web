/*
  Warnings:

  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PartyStatus" AS ENUM ('ATIVO', 'INATIVO', 'INTERESSE', 'PERDA', 'NEGOCIACAO', 'CONTATO', 'NOVO');

-- CreateEnum
CREATE TYPE "PartyEntities" AS ENUM ('CONSUMIDOR', 'FUNCIONARIO', 'PARCEIRO', 'FORNECEDOR');

-- DropTable
DROP TABLE "Verification";

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "status" "PartyStatus" NOT NULL DEFAULT 'ATIVO',
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_type" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "type" "PartyEntities" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "party_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_phone" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "party_phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_address" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "party_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "party_cpf_key" ON "party"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "party_cnpj_key" ON "party"("cnpj");

-- CreateIndex
CREATE INDEX "party_type_partyId_idx" ON "party_type"("partyId");

-- CreateIndex
CREATE UNIQUE INDEX "party_type_partyId_type_key" ON "party_type"("partyId", "type");

-- CreateIndex
CREATE INDEX "party_phone_partyId_idx" ON "party_phone"("partyId");

-- CreateIndex
CREATE UNIQUE INDEX "party_phone_partyId_phone_key" ON "party_phone"("partyId", "phone");

-- CreateIndex
CREATE INDEX "party_address_partyId_idx" ON "party_address"("partyId");

-- AddForeignKey
ALTER TABLE "party_type" ADD CONSTRAINT "party_type_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_phone" ADD CONSTRAINT "party_phone_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_address" ADD CONSTRAINT "party_address_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
