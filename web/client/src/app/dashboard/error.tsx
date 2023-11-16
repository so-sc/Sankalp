"use client"

import { H1, H3 } from "@/components/ui/typography"

export default function ErrorPage() {
  return (
    <div className="text-center my-16">
      <H1 className="my-4">Error fetching the data</H1>
      <H3>Sorry for inconvience, Please try again</H3>
    </div>
  )
}
