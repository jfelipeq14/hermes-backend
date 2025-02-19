/*
  Warnings:

  - You are about to drop the column `idPrivilege` on the `permits` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `privileges` table. All the data in the column will be lost.
  - Added the required column `idPermit` to the `privileges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permits" DROP CONSTRAINT "permits_idPrivilege_fkey";

-- DropIndex
DROP INDEX "rolePrivileges_idRole_idPrivilege_key";

-- AlterTable
ALTER TABLE "permits" DROP COLUMN "idPrivilege";

-- AlterTable
ALTER TABLE "privileges" DROP COLUMN "status",
ADD COLUMN     "idPermit" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_idPermit_fkey" FOREIGN KEY ("idPermit") REFERENCES "permits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
