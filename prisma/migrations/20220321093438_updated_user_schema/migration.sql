-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expiration_code" SET DEFAULT NOW() + interval '1 hour';
