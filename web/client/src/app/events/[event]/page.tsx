import { getUser } from "@/app/dashboard/page"
import EventRegistration from "@/components/registration/event-registration"
import { H1, H2 } from "@/components/ui/typography"
import { EVENTS_DETAILS, EVENTS_PATHS } from "@/lib/constants"
import { Metadata, ResolvingMetadata } from "next"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

interface URLProps {
  params: { event: string }
}

export async function generateMetadata(
  { params }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { event } = params

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: event[0].toUpperCase() + event.slice(1),
    description: `Register for ${
      EVENTS_DETAILS[EVENTS_PATHS.indexOf(`/${event}`)].name
    }`,
    openGraph: {
      images: [`${event}.jpg`, ...previousImages],
    },
  }
}

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
    <main className="container max-w-5xl mx-auto px-8 lg:px-20 xl:px-24 py-12">
      <h1 className="mt-3 tracking-wide text-3xl font-bold">
        Register for {EVENTS_DETAILS[eventId].name}
      </h1>
      <h2 className="text-2xl mt-4 font-light">Welcome {user.data.name}!</h2>
      <EventRegistration eventId={eventId} user={user.data} />
    </main>
  )
}
