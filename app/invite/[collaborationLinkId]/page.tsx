import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { makeCollaborator } from "@/features/document/actions/LinkActions"

interface pageProps {
  params: Promise<{ collaborationLinkId: string }>
}
export default async function Invite({ params }: pageProps) {
  const { collaborationLinkId } = await params
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) redirect("/login")
  const result = await makeCollaborator(collaborationLinkId, session.user.id);
  if (!result) redirect("/dashboard")

  redirect(`/document/${result.documentId}`);

  return (
    <div>
      <h1>Prepare yourself to start collaborating...</h1>
    </div>
  )
}
