"use client"

import { useEffect, useRef, useState } from "react"
import * as Y from "yjs"
import { HocuspocusProvider } from "@hocuspocus/provider"
import dynamic from "next/dynamic"
import { changeTitle } from "@/features/dashboard/actions/docActions"
import { generateLink } from "../actions/LinkActions"
import CopyButton from "./CopyButton"
import 'dotenv/config'
const SimpleEditor = dynamic(
  () => import("@/components/tiptap-templates/simple/simple-editor").then((mod) => mod.SimpleEditor),
  {
    ssr: false,
  }

)
interface WrapperProps {
  documentId: string
  title: string
  currentUser: { id: string; name: string; image?: string | null }
  isOwner: boolean
}

export function SimpleEditorWrapper({ documentId, title, currentUser, isOwner }: WrapperProps) {
  const [docTitle, setDocTitle] = useState(title)
  const [collaborationLinkId, setCollaborationLinkId] = useState("")
  const ydocRef = useRef<Y.Doc | null>(null)
  const providerRef = useRef<HocuspocusProvider | null>(null)
  const [isReady, setIsReady] = useState(false)
  async function handleLinkCreation() {
    const result = await generateLink(documentId);
    if (!result) return;
    setCollaborationLinkId(result.id)
  }
  useEffect(() => {
    const ydoc = new Y.Doc()
    const provider = new HocuspocusProvider({
      url: "ws://localhost:1234",
      name: documentId,
      document: ydoc,
      onConnect: () => setIsReady(true),
      onAuthenticationFailed: () => setIsReady(false)
    })

    ydocRef.current = ydoc
    providerRef.current = provider
    return () => {
      setIsReady(false)
      provider.destroy()
      ydoc.destroy()
      ydocRef.current = null
      providerRef.current = null
      setCollaborationLinkId("")
    }
  }, [documentId])

  if (!isReady || !ydocRef.current || !providerRef.current) {
    return <div className="text-center p-8 text-text_muted">Connecting to collaborative server</div>
  }

  return (
    <div>
      <div className="flex flex-row">
        <form onSubmit={() => changeTitle(documentId, docTitle)}>
          <input className="text-text text-2xl " type="text" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} />
        </form>
        {isOwner &&
          <div className="flex flex-row items-center gap-10">
            {collaborationLinkId !== "" ?
              <div className="flex flex-row items-center gap-2">
                <h2>http://localhost:3000/invite/{collaborationLinkId}</h2>
                <CopyButton textToCopy={`http://localhost:3000/invite/${collaborationLinkId}`} />
              </div>
              :
              <button className="bg-primary text-text" onClick={handleLinkCreation}>Get Collaboration Link</button>
            }
          </div>
        }
      </div>
      <SimpleEditor documentId={documentId} provider={providerRef.current} ydoc={ydocRef.current} currentUser={currentUser} />
    </div>
  )
}
