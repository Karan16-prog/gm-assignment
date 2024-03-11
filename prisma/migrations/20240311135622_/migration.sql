/*
  Warnings:

  - The primary key for the `IngredientB` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "IngredientB" DROP CONSTRAINT "IngredientB_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "IngredientB_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "IngredientB_id_seq";
