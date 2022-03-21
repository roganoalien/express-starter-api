/*
  Warnings:

  - You are about to drop the column `super_admin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "super_admin",
ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;
