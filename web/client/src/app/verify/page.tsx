"use client"

import { H1, H2 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function VerifyPage() {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      redirect("/")
    }, 3000)
    return () => {
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <main className="h-96 flex flex-col gap-4 justify-center items-center">
      <H1>Welcome Captain!</H1>
      <H2>
        This page is under maintenance you may need this during the event.
      </H2>
      <p>
        <Link href="/" className="underline">
          Click here
        </Link>{" "}
        to Register to {MAIN_EVENT_NAME}
      </p>
    </main>
  )
}
