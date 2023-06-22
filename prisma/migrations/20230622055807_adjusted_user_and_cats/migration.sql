/*
  Warnings:

  - You are about to drop the column `email` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cat_id_key";

-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "email",
DROP COLUMN "owner",
DROP COLUMN "phone",
ADD COLUMN     "ownerId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthdate",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cat" ADD CONSTRAINT "Cat_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
