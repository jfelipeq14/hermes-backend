/*
  Warnings:

  - Added the required column `hour` to the `meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetings" ADD COLUMN     "hour" TIMESTAMP(3) NOT NULL;
