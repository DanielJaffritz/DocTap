import { useEffect, useState } from "react"

export default function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 3000 }: { children: any, autoSlide: boolean, autoSlideInterval: number, isDashboard: boolean }) {
  const [curr, setCurr] = useState(0)
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => {
      clearInterval(slideInterval)
    }
  }, [])
  return (
    <div className="overflow-hidden relative">
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>{slides}</div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="p-1 rounded-full shadow bg-white text-text hover:bg-white">
          dodo
        </button>
        <button onClick={next} className="p-1 rounded-full shadow bg-white text-text hover:bg-white">
          dido
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((indicator: any, i: any) => (
            <div className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-4" : "backdrop-opacity-50"}`}>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
