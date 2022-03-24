-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expiration_code" SET DEFAULT NOW() + interval '1 hour';

-- CreateTable
CREATE TABLE "BlackToken" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,

    CONSTRAINT "BlackToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlackToken_token_key" ON "BlackToken"("token");
