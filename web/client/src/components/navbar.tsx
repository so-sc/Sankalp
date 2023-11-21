"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { MAIN_EVENT_NAME, MAIN_EVENT_WEBSITE } from "@/lib/constants";
import { useUser } from "@/providers/user-provider";
import { CookieValueTypes, getCookie } from "cookies-next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { TbX } from "react-icons/tb";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [token, setToken] = useState<CookieValueTypes | null>(null);
  const path = usePathname();
  useEffect(() => {
    const _token = getCookie("token");
    setToken(_token);
  }, [path]);

  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className="px-4 py-4 md:hidden cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <X /> : <Menu />}
      </div>
      <nav
        className={`${
          toggle
            ? "translate-y-0 bg-foreground/10 md:bg-none"
            : "absolute md:relative -translate-y-[200%] md:translate-y-0"
        } py-4 md:py-0 md:grid md:grid-cols-6 px-4 transition-all duration-500`}
      >
        <div className="flex pt-3 items-center h-full md:place-self-start">
          <Link
            href="/"
            className="font-bold tracking-wider text-xl hover:text-foreground/50"
          >
            Sankalp
            <span className="text-xs absolute bg-orange-300 text-black px-1 py-0.5 ml-0.5">
              BETA
            </span>
          </Link>
        </div>
        <ul className="relative flex flex-col md:flex-row justify-center gap-2 md:gap-8 col-span-4 place-self-center md:bg-foreground/10 w-full h-full py-4 rounded-b-full">
          {token ? (
            <>
              <Link
                href="/dashboard"
                className="hover:underline underline-offset-2"
              >
                Dashboard
              </Link>
              <Link
                href="/hackathon"
                className="hover:underline underline-offset-2"
              >
                Hackathon
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="hover:underline underline-offset-2">
                Register
              </Link>
              <Link
                href="/?state=login"
                className="hover:underline underline-offset-2"
              >
                Login
              </Link>
            </>
          )}
          <Link
            href={MAIN_EVENT_WEBSITE}
            target="_blank"
            className="hover:underline underline-offset-2 flex items-center"
          >
            {MAIN_EVENT_NAME} <ExternalLink className="scale-75" />
          </Link>
        </ul>
        <div className="flex gap-2 pt-3 items-center h-full md:place-self-end">
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
