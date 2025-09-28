/*
  Warnings:

  - The values [BAIXO,MEDIO,ALTO] on the enum `Independence` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Independence_new" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');
ALTER TABLE "public"."pets" ALTER COLUMN "independence" TYPE "public"."Independence_new" USING ("independence"::text::"public"."Independence_new");
ALTER TYPE "public"."Independence" RENAME TO "Independence_old";
ALTER TYPE "public"."Independence_new" RENAME TO "Independence";
DROP TYPE "public"."Independence_old";
COMMIT;
