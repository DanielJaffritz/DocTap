
'use client'

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"

export default function DocumentMain({ url }: { url: string }) {

  return (
    <div>
      <form>
        <div>
          <input type="text" placeholder="New Document" />
          <button type="submit">save document</button>
        </div>
        <div>
          <SimpleEditor />
        </div>
      </form>
    </div>

  )
}
