'use client'
import { useState } from "react"

export default function Carousel({ children: slides }: { children: string[] }) {
  const [curr, setCurr] = useState(0)
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  return (
    <div className="border border-border overflow-hidden relative rounded-2xl">
      <div className="flex transition-transform ease-out duration-500">
        <img src={slides[curr]} />
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="p-1 rounded-full shadow bg-white text-zinc-800 hover:bg-amber-100 cursor-pointer">
          <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
        <button onClick={next} className="p-1 rounded-full shadow bg-white text-zinc-800 hover:bg-amber-100 cursor-pointer">
          <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((indicator: any, i: any) => (
            <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-4" : "backdrop-opacity-50"}`}>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
