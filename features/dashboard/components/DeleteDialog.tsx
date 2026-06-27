import { useRouter } from "next/navigation";
import { deleteDocs } from "../actions/docActions";
import { dialogProps } from "../types/docTypes";
import { startTransition } from "react";

export default function DeleteDialog({ isOpen, setIsOpen, docId, optimistic }: dialogProps) {
  const router = useRouter();
  if (!isOpen) return null;
  const handleDelete = async () => {
    startTransition(async () => {
      optimistic(docId)
      try {
        await deleteDocs(docId)
        setIsOpen(false)
      } catch (error) {
        console.error("error", error)
        setIsOpen(false)
      }

    })
  }
  return (
    <dialog open closedby="any" onClose={() => setIsOpen(false)} className="bg-background p-10 items-center border border-border transition-all rounded-2xl shadow-2xl flex flex-col w-2/3 md:w-1/2 fixed top-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-text font-semibold">Are you sure you want to delete this document?</h1>
      <h2 className="text-text">You will lost everything you have written here!</h2>
      <div className="flex flex-row gap-10 mt-10">
        <button onClick={handleDelete} className="bg-red-500 p-3 rounded-md hover:bg-red-600 cursor-pointer text-text transition-all">
          Delete Document
        </button>
        <button onClick={() => setIsOpen(false)} className="text-text transition-all border border-border hover:bg-border cursor-pointer p-3 rounded-md">
          Cancel
        </button>
      </div>
    </dialog>

  )
}
