function DocPreview({ html }: { html: string | null }) {
  const content = html && html !== "<p></p>" ? html : "<p style='color: text-text'>Empty Document</p>"
  return (
    <div className="w-full aspect-3/4 bg-background overflow-hidden relative shadow-sm select-none pointer-events-none group">
      <div className="p-2 text-text absolute top-0 left-0 w-[333.33%] h-[333.33%] origin-top-left scale-[0.5] simple-editor-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-neutral-50 via-transparent to-transparent dark:from-neutral-950 opacity-90 pointer-events-none" />
    </div>
  )
}

export default DocPreview
