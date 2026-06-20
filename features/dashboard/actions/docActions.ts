'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
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
  if (!session) return null
  const docs = await prisma.document.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        {
          collaborators: {
            some: {
              userId: session.user.id
            }
          }
        }
      ]
    }
  })
  const { ownedDocs, collabDocs } = docs.reduce((acc: any, value: any) => {
    if (value.ownerId === session.user.id) {
      acc.ownedDocs.push(value);
    } else {
      acc.collabDocs.push(value);
    }
    return acc;
  }, { ownedDocs: [], collabDocs: [] })

  return { ownedDocs, collabDocs }

}

export async function searchDocs(search: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) return null
  if (search === "") return;
  const result = await prisma.document.findMany({
    where: {
      AND: [
        {
          OR: [
            { ownerId: session.user.id },
            {
              collaborators: {
                some: {
                  userId: session.user.id
                }
              }
            }
          ]
        },
        { title: { contains: search, mode: "insensitive" } }
      ]
    }
  })
  if (!result) return []
  return result
}
export async function deleteDocs(documentId: string) {
  await prisma.document.delete({
    where: { id: documentId }
  })
  revalidatePath('/dashboard', "page");
}
export async function changeTitle(documentId: string, title: string) {
  await prisma.document.update({
    where: { id: documentId },
    data: { title: title }

  })
  revalidatePath("/dashboard", "page")
}
export async function updateDocPreview(documentId: string, htmlPreview: string) {
  try {
    await prisma.document.update({
      where: { id: documentId },
      data: { htmlPreview },
    })
  } catch (error) {
    console.error("Error", error)
  }
}

