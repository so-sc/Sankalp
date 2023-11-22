import Error404 from "@/app/events/[event]/404"
import { EVENTS_PATHS } from "@/lib/constants"
import { notFound } from "next/navigation"

export default function EventPage({ params }: { params: { event: string } }) {
  const { event } = params

  if (!EVENTS_PATHS.includes(event)) {
    notFound()
  }
  return <div>{event}</div>
}
