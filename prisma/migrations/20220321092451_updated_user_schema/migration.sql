-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT NOW() + interval '1 hour';
