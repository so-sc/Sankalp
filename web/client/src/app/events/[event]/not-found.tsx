"use client"

import { H1, H3 } from "@/components/ui/typography"

export default function NotFound() {
  return (
    <div className="text-center my-16 mx-4">
      <H1 className="my-4">Error 404 Page not found</H1>
      <H3>Please check the URL, and try again</H3>
    </div>
  )
}
