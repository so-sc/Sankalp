"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { TbX } from "react-icons/tb"

export default function Navbar() {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <div
        className="px-4 py-4 md:hidden cursor-pointer bg-foreground/10"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <TbX /> : <FaBars />}
      </div>
      <nav
        className={`${
          toggle
            ? "translate-y-0 bg-foreground/10"
            : "absolute md:relative -translate-y-[200%] md:translate-y-0"
        } py-4 md:py-0 md:grid md:grid-cols-6 px-4 md:border-t-8 border-t-foreground/10 transition-all duration-500`}
      >
        <div className="flex items-center h-full md:place-self-start">
          <Link href="/" className="font-bold tracking-wider text-xl">
            Sankalp
          </Link>
        </div>
        <ul className="relative flex flex-col md:flex-row justify-center gap-2 md:gap-8 col-span-4 place-self-center md:bg-foreground/10 w-full h-full py-4 rounded-b-full">
          <Link href="https://devhost.sosc.org.in" target="_blank">
            DevHost
          </Link>
          <Link href="/hackathon">Hackathon</Link>
          <Link href="/contact">Contact</Link>
        </ul>
        <div className="flex gap-2 items-center h-full md:place-self-end">
          <div className="relative w-8 aspect-square">
            <Image
              src="https://github.com/heimanpictures.png"
              alt="User Profile"
              fill
              sizes="100%"
              className="rounded-full cursor-pointer"
            />
          </div>
          <p className="md:hidden">Name</p>
        </div>
      </nav>
    </>
  )
}
