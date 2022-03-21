/*
  Warnings:

  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "admin",
ADD COLUMN     "is_super_admin" BOOLEAN NOT NULL DEFAULT false;
