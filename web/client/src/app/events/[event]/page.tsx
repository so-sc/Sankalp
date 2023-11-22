import { getUser } from "@/app/dashboard/page"
import EventRegistration from "@/components/registration/event-registration"
import { H1, H2 } from "@/components/ui/typography"
import { EVENTS_DETAILS, EVENTS_PATHS } from "@/lib/constants"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export default async function EventPage({
  params,
}: {
  params: { event: string }
}) {
  // If the page is not an event from defined events, return 404
  const { event } = params
  if (!EVENTS_PATHS.includes(`/${event}`)) {
    notFound()
  }
  // This is basically index but ID sounds more cool
  const eventId = EVENTS_PATHS.indexOf(`/${event}`)
  const user = await getUser()

  const token = cookies().get("token")?.value
  if (!token) {
    redirect("/")
  }

  return (
    <main className="container my-8">
      <H1>Register for {EVENTS_DETAILS[eventId].name}</H1>
      <H2 className="mt-3">Welcome {user.data.name}!</H2>
      <EventRegistration eventId={eventId} user={user.data} />
    </main>
  )
}
