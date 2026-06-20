'use server'
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import crypto from "crypto"

export async function generateLink(documentId: string) {
  const verify = await prisma.collaborativeLink.findUnique({
    where: { documentId }
  })
  if (verify) {
    if (new Date() > verify.expiresAt) {
      await prisma.collaborativeLink.delete({
        where: { documentId }
      })
    }
    else {
      return verify
    }
  }

  const token = crypto.randomBytes(32).toString('hex');
  const link = await prisma.collaborativeLink.create({
    data: {
      id: token,
      documentId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  })
  if (!link)
    return null

  return link
}
export async function makeCollaborator(collaborativeLinkId: string, userId: string) {
  const verify = await prisma.collaborativeLink.findUnique({
    where: { id: collaborativeLinkId }
  })
  if (!verify || new Date() > verify.expiresAt) return null
  const makeCollaborator = await prisma.documentCollaborator.create({
    data: {
      documentId: verify.documentId,
      userId
    }
  })
  return makeCollaborator

}
export async function deleteLink(linkId: string) {
  try {
    await prisma.collaborativeLink.delete({
      where: { id: linkId }
    })
    return "success"
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return "document not found"
      }
      return "unknown error, try again"
    }
  }
}


