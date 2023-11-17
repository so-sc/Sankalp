"use client"

import { H1, H2 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

type Params = {
  params: {
    id: string
  }
}

export default function VerifyPage({ params }: Params) {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      redirect("/")
    }, 5000)
    return () => {
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <main className="h-96 flex flex-col gap-4 justify-center items-center">
      <H1>Welcome Captain!</H1>
      <H2>Your account has been verified successfully.</H2>
      <p>
        <Link href="/" className="underline">
          Click here
        </Link>{" "}
        to Register to {MAIN_EVENT_NAME}
      </p>
    </main>
  )
}
