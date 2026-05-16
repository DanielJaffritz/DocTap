
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from 'next/link'


export default async function Dashboard() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });


  return (
    <div>
      <Link href={`/dashboard/document/${crypto.randomUUID()}`}>orngrngngunorgtogno</Link>
    </div >

  )
}
