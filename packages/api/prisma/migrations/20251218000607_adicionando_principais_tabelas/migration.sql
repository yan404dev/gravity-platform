/*
  Warnings:

  - A unique constraint covering the columns `[user_id,profile_id]` on the table `users_profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "profile_privacy" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "event_status" AS ENUM ('draft', 'published', 'cancelled', 'completed');

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "category" TEXT,
ADD COLUMN     "privacy" "profile_privacy" NOT NULL DEFAULT 'public';

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "event_status" NOT NULL DEFAULT 'draft',
    "thumbnail_url" TEXT,
    "banner_url" TEXT,
    "tags" TEXT[],
    "timezone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "updated_by_id" INTEGER,
    "deleted_by_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_attendees" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "updated_by_id" INTEGER,
    "deleted_by_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "events_attendees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_reviews" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_by_id" INTEGER NOT NULL,
    "updated_by_id" INTEGER,
    "deleted_by_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "events_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_date_range" ON "events"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "events_city" ON "events"("city");

-- CreateIndex
CREATE INDEX "events_address" ON "events"("address");

-- CreateIndex
CREATE INDEX "events_location" ON "events"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "events_created_by_id" ON "events"("created_by_id");

-- CreateIndex
CREATE INDEX "events_updated_by_id" ON "events"("updated_by_id");

-- CreateIndex
CREATE INDEX "events_deleted_by_id" ON "events"("deleted_by_id");

-- CreateIndex
CREATE INDEX "event_attendees_event_id" ON "events_attendees"("event_id");

-- CreateIndex
CREATE INDEX "event_attendees_profile_id" ON "events_attendees"("profile_id");

-- CreateIndex
CREATE INDEX "event_attendees_created_by_id" ON "events_attendees"("created_by_id");

-- CreateIndex
CREATE INDEX "event_attendees_updated_by_id" ON "events_attendees"("updated_by_id");

-- CreateIndex
CREATE INDEX "event_attendees_deleted_by_id" ON "events_attendees"("deleted_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_attendees_event_id_profile_id_key" ON "events_attendees"("event_id", "profile_id");

-- CreateIndex
CREATE INDEX "event_reviews_event_rating" ON "events_reviews"("event_id", "rating");

-- CreateIndex
CREATE INDEX "event_reviews_profile_id" ON "events_reviews"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_reviews_event_id_profile_id_key" ON "events_reviews"("event_id", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_profiles_user_id_profile_id_key" ON "users_profiles"("user_id", "profile_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_reviews" ADD CONSTRAINT "events_reviews_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_reviews" ADD CONSTRAINT "events_reviews_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_reviews" ADD CONSTRAINT "events_reviews_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_reviews" ADD CONSTRAINT "events_reviews_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_reviews" ADD CONSTRAINT "events_reviews_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
