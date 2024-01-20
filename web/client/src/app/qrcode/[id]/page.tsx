import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"

interface URLProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { event } = searchParams

  return {
    title: `${event && event[0].toUpperCase() + event.slice(1)} QR Code`,
  }
}

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
    <main className="container flex flex-col items-center my-20">
      <H1 className="text-center mb-8">Your QR Code for {event}</H1>
      <div className="p-4 bg-white rounded-2xl">
        <Image
          src={`https://qr.heimanbotz.workers.dev/download/${id}`}
          alt="QR Code for the event"
          width={250}
          height={250}
          className="block"
        />
      </div>
      <Button className="mt-8 px-10" asChild>
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
