/*
  Warnings:

  - The values [MÉDIA] on the enum `EnergyLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EnergyLevel_new" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');
ALTER TABLE "public"."pets" ALTER COLUMN "energy_level" TYPE "public"."EnergyLevel_new" USING ("energy_level"::text::"public"."EnergyLevel_new");
ALTER TYPE "public"."EnergyLevel" RENAME TO "EnergyLevel_old";
ALTER TYPE "public"."EnergyLevel_new" RENAME TO "EnergyLevel";
DROP TYPE "public"."EnergyLevel_old";
COMMIT;
