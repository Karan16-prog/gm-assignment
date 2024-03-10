/*
  Warnings:

  - Added the required column `day` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "day" TEXT NOT NULL;
