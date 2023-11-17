"use client"

import { H1, H3 } from "@/components/ui/typography"
import { deleteCookie } from "cookies-next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string }
}) {
  deleteCookie("token")
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      redirect("/?state=login")
    }, 1500)

    return () => {
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <div className="text-center my-16">
      <H1 className="my-4">Error fetching the data</H1>
      <H3>Error logging in, please try again</H3>
      <p>
        <Link href="/?state=login" className="underline mt-4">
          Click here
        </Link>{" "}
        to go back to Login page
      </p>
    </div>
  )
}
