-- DropForeignKey
ALTER TABLE "party_address" DROP CONSTRAINT "party_address_partyId_fkey";

-- DropForeignKey
ALTER TABLE "party_phone" DROP CONSTRAINT "party_phone_partyId_fkey";

-- AddForeignKey
ALTER TABLE "party_phone" ADD CONSTRAINT "party_phone_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_address" ADD CONSTRAINT "party_address_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE CASCADE ON UPDATE CASCADE;
