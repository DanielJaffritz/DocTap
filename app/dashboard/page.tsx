import { createDoc } from "@/features/dashboard/actions/docActions";



export default async function Dashboard() {
  return (
    <div>
      <button onClick={createDoc}>New Document</button>
    </div >


  )
}
