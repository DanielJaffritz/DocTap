-- CreateTable
CREATE TABLE "collaborative_link" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborative_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collaborative_link_documentId_key" ON "collaborative_link"("documentId");

-- AddForeignKey
ALTER TABLE "collaborative_link" ADD CONSTRAINT "collaborative_link_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
