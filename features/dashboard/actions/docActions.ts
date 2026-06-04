'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export async function createDoc() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  })
  if (!session) redirect('/login');
  const res = await prisma.document.create({
    data: {
      ownerId: session.user.id,
    }
  })
  const documentId = res.id
  redirect(`/document/${documentId}`)

}
export async function getDocs() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) return { docs: null, message: "could not find session" }
  const docs = await prisma.document.findMany({
    where: { ownerId: session.user.id }
  })

  if (docs.length <= 0) return { docs: null, message: "no documents" }

  return { docs: docs, message: "success" }

}
export async function deleteDocs(documentId: string) {
  try {
    await prisma.document.delete({
      where: { id: documentId }
    })
    return { status: "success", message: "success" }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { status: "failure", message: "document not found" }
      }
      return { status: "failure", message: "unknown error, try again" }
    }
  }
}
export async function changeTitle(documentId: string, title: string) {
  try {
    await prisma.document.update({
      where: { id: documentId },
      data: { title: title }

    })
    return { status: "success", message: "success" }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { status: "failure", message: "document not found" }
      }
      return { status: "failure", message: "unknown error, try again" }
    }
  }
}
