import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Verification(email: string) {
  async function resend() {
    await authClient.sendVerificationEmail({
      email: email
    })

  }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-text text-2xl font-semibold">Please verify your email before continue</h1>
      <Link className="bg-primary hover:bg-secondary text-zinc-800 rounded-2xl p-3 transition-all" href="/dashboard">go to dashboard</Link>
      <p className="text-text">Did not receive an email? <button className="text-sky-400 hover:text-sky-300 cursor-pointer transition-all">click here to resend</button></p>
    </div>
  )
}

