/*
  Warnings:

  - You are about to drop the column `category` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `privacy` on the `profiles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "event_privacy" AS ENUM ('public', 'private');

-- DropIndex
DROP INDEX "profiles_email";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "category" TEXT,
ADD COLUMN     "privacy" "event_privacy" NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "category",
DROP COLUMN "email",
DROP COLUMN "privacy";

-- DropEnum
DROP TYPE "profile_privacy";
