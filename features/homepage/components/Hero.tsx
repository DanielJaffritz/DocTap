import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center align-items gap-8">
      <h1 className="text-4xl text-text shadow-2xl font-semibold">Create and edit documents<br /> with <span className="text-text_muted">your team</span> in real time</h1>
      <div className="flex flex-row gap-10 items-center justify-center align-items">
        <Link href="/signup" className="text-black text-2xl p-4 bg-primary rounded-2xl hover:bg-sky-500">
          Get Started
        </Link>
        <Link href="/login" className="text-black text-2xl p-4 bg-primary rounded-2xl hover:bg-sky-500">
          Sign In
        </Link>

      </div>
    </div>

  )
}

