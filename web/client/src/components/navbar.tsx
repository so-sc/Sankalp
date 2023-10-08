import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="grid grid-cols-3 px-4 border-t-8 border-t-foreground/10">
      <div className="flex items-center h-full place-self-start">
        <Link href="/">Name</Link>
      </div>
      <ul className="relative flex justify-center gap-8 place-self-center bg-foreground/10 w-full h-full py-4 rounded-b-full">
        <Link href="https://devhost.sosc.org.in" target="_blank">
          DevHost
        </Link>
        <Link href="/hackathon">Hackathon</Link>
        <Link href="/contact">Contact</Link>
      </ul>
      <div className="flex gap-2 items-center h-full place-self-end">
        <div className="relative w-8 aspect-square">
          <Image
            src="https://github.com/heimanpictures.png"
            alt="User Profile"
            fill
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>
    </nav>
  )
}
