"use client"

import { useOptimistic, useState } from "react"
import { createDoc } from "../actions/docActions"
import DeleteDialog from "./DeleteDialog";
import DocPreview from "./DocPreview";
import Link from "next/link";

export default function DashboardMain({ items }: { items: any }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState("")
  const [optimisticDocs, deleteOptimisticDocs] = useOptimistic(
    items.ownedDocs,
    (state: any, docId: string) => state.filter((doc: any) => doc.id !== docId)
  )
  async function handleDeleteOpenDialog(docId: string) {
    setId(docId);
    setOpenDeleteDialog(true);
  }



  return (
    <div className="h-full flex flex-col p-30 gap-15 overflow-x-hidden max-w-full">
      {optimisticDocs.length <= 0 ?

        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-text text-4xl">There are not documents, let's start by creating one here</h1>
          <button onClick={createDoc} className="bg-primary hover:bg-secondary p-2 text-xl rounded-2xl cursor-pointer transition-all">New Document</button>
        </div> :
        <div className="gap-5">
          <button onClick={createDoc} className="bg-primary hover:bg-secondary p-2 rounded-2xl cursor-pointer transition-all m-5">New Document</button>
          <h1 className="text-3xl text-text font-semibold">Your Documents</h1>
          <div className="grid grid-cols-5 p-10 gap-5">{optimisticDocs.map((doc: any, i: number) => (
            <div key={i} className="border-2 border-border bg-background rounded-xs">
              <Link href={`document/${doc.id}`}>
                <DocPreview html={doc.htmlPreview} />
              </Link>

              <div className="p-2 border-t-2 border-border">
                <h1 className="text-text font-semibold">
                  {doc.title}
                </h1>
                <div className="flex flex-row gap-2 justify-between">
                  <h1 className="text-text">updated at {new Date(doc.updatedAt).toLocaleDateString()}</h1>
                  <button className="cursor-pointer" onClick={() => handleDeleteOpenDialog(doc.id)}>
                    <svg className="w-7 stroke-text_muted hover:stroke-text" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          </div>
        </div>}
      <div className="h-1 w-full bg-primary" />
      {items.collabDocs.length <= 0 ?
        <div className="w-full flex items-center justify-center align-items">
          <h1 className="text-text text-4xl">You are a not collaborator of any document, ask a friend for a link!</h1>
        </div> :
        <div>
          <h1 className="text-3xl text-text font-semibold">Your Collaborations</h1>
          <div className="flex flex-row overflow-x-auto overflow-y-hidden gap-10 p-10 w-full">
            {items.collabDocs.map((doc: any, i: any) => (
              <Link key={i} href={`/document/${doc.id}`} className="bg-primary p-10 rounded-2xl">
                <div className="flex items-center justify-center align-items text-text font-semibold text-2xl">
                  {doc.title}
                </div>
                {new Date(doc.updatedAt).toLocaleDateString()}
              </Link>
            ))}
          </div>
        </div>}
      <DeleteDialog isOpen={openDeleteDialog} setIsOpen={setOpenDeleteDialog} docId={id} optimistic={deleteOptimisticDocs} />
    </div>

  )
}
