import { getUser } from "@/app/dashboard/page"
import EventRegistration from "@/components/registration/event-registration"
import { Button } from "@/components/ui/button"
import { H1, H2 } from "@/components/ui/typography"
import { EVENTS_DETAILS, EVENTS_PATHS } from "@/lib/constants"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function EventPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // If the page is not an event from defined events, return 404
  const { id } = params
  const { event } = searchParams

  return (
    <main className="container flex flex-col items-center my-8">
      <H1 className="text-center mt-4 mb-8">Your QR Code for {event}</H1>
      <Image
        src={`https://qr.heimanbotz.workers.dev/download/${id}`}
        alt="QR Code for the event"
        width={250}
        height={250}
        className="block"
      />
      <Button className="mt-8" asChild>
        <Link
          href={`https://qr.heimanbotz.workers.dev/download/${id}`}
          download={`${event} QR Code`}
        >
          Download QR
        </Link>
      </Button>
    </main>
  )
}
