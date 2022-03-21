-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expiration_code" SET DEFAULT NOW() + interval '1 hour',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
