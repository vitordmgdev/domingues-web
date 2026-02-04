/*
  Warnings:

  - The values [ATIVO,INATIVO,NEGOCIACAO] on the enum `PartyStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartyStatus_new" AS ENUM ('NOVO', 'SUSPENSO', 'CONTATO', 'INTERESSE', 'PERDA');
ALTER TABLE "public"."party" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "party" ALTER COLUMN "status" TYPE "PartyStatus_new" USING ("status"::text::"PartyStatus_new");
ALTER TYPE "PartyStatus" RENAME TO "PartyStatus_old";
ALTER TYPE "PartyStatus_new" RENAME TO "PartyStatus";
DROP TYPE "public"."PartyStatus_old";
ALTER TABLE "party" ALTER COLUMN "status" SET DEFAULT 'NOVO';
COMMIT;
