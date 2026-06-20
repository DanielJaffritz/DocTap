import { getDocs } from "@/features/dashboard/actions/docActions";
import DashboardMain from "@/features/dashboard/components/Main";
import DashboardNavBar from "@/features/dashboard/components/navBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) redirect('/login')
  const docs = await getDocs();
  return (
    <div className="w-full h-full relative">
      <DashboardNavBar username={session.user.name} image={session.user.image} id={session.user.id} />
      <DashboardMain items={docs} />
    </div >


  )
}
