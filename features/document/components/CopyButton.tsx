'use client'

import { useState } from "react"

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => setCopied(false), 200)
    } catch (error) {
      console.error('Error copying to clipboard: ', error)
    }
  }
  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-primary text-text rounded hover:bg-secondary transition-all">
      {copied ? "Copied" : "Copy Link"}
    </button>
  )
}
