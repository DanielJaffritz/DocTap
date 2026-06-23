"use client"
import AppLogo from "@/components/AppLogo";
import { useEffect, useState } from "react";
import { searchDocs } from "../actions/docActions";
import Link from "next/link";
import { navBarProps } from "../types/docTypes";
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function DashboardNavBar({ username, image, id }: navBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    async function getDocs() {
      const result = await searchDocs(search)
      setResults(result)
      setSelectedIndex(-1)
    }
    if (!search.trim()) {
      setResults([])
      return;
    }
    const handler = setTimeout(() => {
      getDocs()
    }, 500);
    return () => clearTimeout(handler)
  }, [search])

  const handleKeyDown = (e: any) => {
    if (!isOpen || results.length <= 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : results.length - 1
      )
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        selectItem(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }
  const selectItem = (item: any) => {
    router.push(`/document/${item.id}`)
    setIsOpen(false);
    setSelectedIndex(-1)
  }
  return (
    <div className="absolute z-50 flex flex-col items-center w-full">
      <div className="flex flex-row items-center justify-between p-5 bg-background_secondary border-b border-border w-full gap-10">
        <Link href="/">
          <AppLogo />
        </Link>
        <div id="search" className="w-1/3 items-center flex flex-row border rounded-2xl text-text border-text_muted hover:border-border p-2">
          <svg viewBox="0 0 24 24" className="w-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          <input
            type="text"
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)} placeholder="search documents..."

            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            onKeyDown={handleKeyDown}
          />

        </div>
        <div className="flex flex-row items-center gap-2">
          <h2 className="font-semibold text-text">{username}</h2>
          {!image ?
            <svg className="w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#1C274C"></path> </g></svg>
            :

            <img src={image} />
          }
        </div>
      </div>
      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden h-1/2 flex flex-col mt-0.5 bg-background_secondary border border-border text-text shadow-2xl w-1/2 transition-all rounded-2xl p-10 space-y-3">
          {results.map((item: any, i: any) => (
            <Link key={i} onMouseEnter={() => setSelectedIndex(i)} href={`/document/${item.id}`} className={`w-full h-full hover:bg-primary hover:text-zinc-800 active:bg-primary active:text-zinc-800 rounded-md p-2 transition-all ${i === selectedIndex ? 'text-zinc-800 bg-primary' : ''}`}>
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                {item.ownerId === id ? <h3>Your document</h3> : <h3>Collaboration</h3>}
              </div>
            </Link>
          ))}
        </div>

      )}
    </div>
  )
}

