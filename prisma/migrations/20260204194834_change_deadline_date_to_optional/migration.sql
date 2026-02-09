/*
  Warnings:

  - Made the column `deadlineDate` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "startedAt" DROP NOT NULL,
ALTER COLUMN "deadlineDate" SET NOT NULL;
