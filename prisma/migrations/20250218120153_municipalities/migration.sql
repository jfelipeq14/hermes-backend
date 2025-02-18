/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `municipalities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `municipalities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDepartment` to the `municipalities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "municipalities" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "idDepartment" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idCountry" INTEGER NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_code_key" ON "municipalities"("code");

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_idCountry_fkey" FOREIGN KEY ("idCountry") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
