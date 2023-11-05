"use client"

import { ModeToggle } from "@/components/ui/mode-toggle"
import { MAIN_EVENT_NAME, MAIN_EVENT_WEBSITE } from "@/lib/constants"
import Link from "next/link"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { TbX } from "react-icons/tb"

export default function Navbar() {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <div
        className="px-4 py-4 md:hidden cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <TbX /> : <FaBars />}
      </div>
      <nav
        className={`${
          toggle
            ? "translate-y-0 bg-foreground/10 md:bg-none"
            : "absolute md:relative -translate-y-[200%] md:translate-y-0"
        } py-4 md:py-0 md:grid md:grid-cols-6 px-4 md:border-t-8 border-t-foreground/10 transition-all duration-500`}
      >
        <div className="flex items-center h-full md:place-self-start">
          <Link
            href="/"
            className="font-bold tracking-wider text-xl hover:text-foreground/50"
          >
            Sankalp
          </Link>
        </div>
        <ul className="relative flex flex-col md:flex-row justify-center gap-2 md:gap-8 col-span-4 place-self-center md:bg-foreground/10 w-full h-full py-4 rounded-b-full">
          <Link
            href={MAIN_EVENT_WEBSITE}
            target="_blank"
            className="hover:underline underline-offset-2"
          >
            {MAIN_EVENT_NAME}
          </Link>
          <Link
            href="/hackathon"
            className="hover:underline underline-offset-2"
          >
            Hackathon
          </Link>
          <Link href="/contact" className="hover:underline underline-offset-2">
            Contact
          </Link>
        </ul>
        <div className="flex gap-2 items-center h-full md:place-self-end">
          <ModeToggle />
        </div>
      </nav>
    </>
  )
}
