/*
  Warnings:

  - The values [FUNCIONARIO] on the enum `PartyEntities` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `number` on the `party_address` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartyEntities_new" AS ENUM ('LEAD', 'CLIENTE', 'COLABORADOR', 'FORNECEDOR', 'PARCEIRO');
ALTER TABLE "party_type" ALTER COLUMN "type" TYPE "PartyEntities_new" USING ("type"::text::"PartyEntities_new");
ALTER TYPE "PartyEntities" RENAME TO "PartyEntities_old";
ALTER TYPE "PartyEntities_new" RENAME TO "PartyEntities";
DROP TYPE "public"."PartyEntities_old";
COMMIT;

-- AlterTable
ALTER TABLE "party_address" DROP COLUMN "number",
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;
