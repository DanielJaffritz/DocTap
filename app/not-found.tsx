export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-text font-semibold text-2xl md:text-4xl">This page does not exists or was deleted</h1>
      <button className="bg-primary text-zinc-800 hover:bg-secondary rounded-2xl p-3">Go to dashboard</button>
    </div>
  )
}

