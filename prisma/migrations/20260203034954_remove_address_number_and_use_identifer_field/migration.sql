/*
  Warnings:

  - The values [CONSUMIDOR] on the enum `PartyEntities` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartyEntities_new" AS ENUM ('CLIENTE', 'FUNCIONARIO', 'PARCEIRO', 'FORNECEDOR');
ALTER TABLE "party_type" ALTER COLUMN "type" TYPE "PartyEntities_new" USING ("type"::text::"PartyEntities_new");
ALTER TYPE "PartyEntities" RENAME TO "PartyEntities_old";
ALTER TYPE "PartyEntities_new" RENAME TO "PartyEntities";
DROP TYPE "public"."PartyEntities_old";
COMMIT;

-- AlterTable
ALTER TABLE "party_address" ALTER COLUMN "zipCode" DROP NOT NULL;
