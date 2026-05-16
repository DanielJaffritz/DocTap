import DocumentMain from "@/features/document/components/Main";


export default async function Document({ params }: { params: Promise<{ document: string }> }) {
  const document = await params;
  return (
    <DocumentMain url={document.document} />

  )

}
