import AppLogo from "@/components/AppLogo";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-secondary flex flex-row rounded-3xl px-5 md:px-10 py-2 md:py-3 justify-between m-10">
      <AppLogo width={30} height={30} text_color="alternative" />
      <Link href="/login" className="text-black p-2 bg-primary rounded-2xl hover:bg-sky-500">
        Sign In
      </Link>

    </div>
  )
}
