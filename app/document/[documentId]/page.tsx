import { headers } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { SimpleEditorWrapper } from "@/features/document/components/SimpleEditorWrapper"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{ documentId: string }>
}

export default async function DocumentPage({ params }: PageProps) {
  const { documentId } = await params

  // Obtener la sesión actual usando Better Auth desde el servidor
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/login")
  }

  // Verificar accesos en la DB
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    include: { collaborators: true }
  })

  if (!doc) {
    notFound()
  }

  const isOwner = doc.ownerId === session.user.id
  const isCollaborator = doc.collaborators.some(c => c.userId === session.user.id)

  if (!isOwner && !isCollaborator) {
    return <div className="p-8 text-center text-red-500">No tienes acceso a este documento.</div>
  }

  // Pasamos los datos esenciales al componente cliente del Editor
  return (
    <div className="container mx-auto p-4">
      <SimpleEditorWrapper documentId={documentId} title={doc.title} currentUser={session.user} isOwner={isOwner} />
    </div>
  )
}
