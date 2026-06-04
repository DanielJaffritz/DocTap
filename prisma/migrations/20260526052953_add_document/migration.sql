/*
  Warnings:

  - You are about to drop the column `userId` on the `document` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_userId_fkey";

-- AlterTable
ALTER TABLE "document" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'Sin título';

-- CreateTable
CREATE TABLE "document_collaborator" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',

    CONSTRAINT "document_collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "document_collaborator_documentId_userId_key" ON "document_collaborator"("documentId", "userId");

-- CreateIndex
CREATE INDEX "document_ownerId_idx" ON "document"("ownerId");

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_collaborator" ADD CONSTRAINT "document_collaborator_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_collaborator" ADD CONSTRAINT "document_collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
