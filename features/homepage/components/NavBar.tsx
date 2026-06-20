import AppLogo from "@/components/AppLogo";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-secondary flex flex-row rounded-3xl px-10 py-3 justify-between">
      <AppLogo />
      <Link href="/login" className="text-black p-2 bg-primary rounded-md hover:bg-sky-500">
        Sign In
      </Link>

    </div>
  )
}
