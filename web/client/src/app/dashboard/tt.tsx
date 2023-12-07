"use client"

import Notification from "@/components/ui/notification"
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
    <div className="text-center my-40 mx-4">
      <H1 className="my-4">Error fetching the data</H1>
      <H3>Error logging in, please try again</H3>
      <p className="mt-3">
        <Link
          href="/?state=login"
          className="underline underline-offset-2 hover:underline-offset-4 mt-4"
        >
          Click here
        </Link>{" "}
        to go back to Login page
      </p>
      <div className="w-1/2 mx-auto my-4">
        <Notification variant="info" className="flex flex-col">
          <p>
            Developer note: If you are seeing this try hard refresh{" "}
            <span className="bg-foreground/20 px-2 py-0.5">
              Ctrl + Shift + R
            </span>{" "}
            and login. <br />
            It should fix (hopefully)
          </p>
        </Notification>
      </div>
    </div>
  )
}
