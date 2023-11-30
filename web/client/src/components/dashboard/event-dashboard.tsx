import { EVENTS_DETAILS } from "@/lib/constants"
import { UserDashboardProfile } from "@/lib/types"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface EventDashboardProps {
  user: UserDashboardProfile
}

export default function EventDashboard({ user }: EventDashboardProps) {
  return (
    <>
      {/* Register for events */}
      <div>
        <p className="mb-2 border-b-2 font-semibold border-foreground text-lg py-2">
          Register for other exciting events
        </p>
        <div className="my-4 flex flex-col gap-3">
          {EVENTS_DETAILS.map((event) => (
            <div
              key={event.name}
              className="hover:underline underline-offset-2"
            >
              {/* No need of / again before it is there in the link value */}
              <Link href={`/events${event.link}`}>
                <span className="font-bold">{event.name}</span>:{" "}
                {event.actualName}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <p className="mt-4 mb-2 border-b-2 font-semibold border-foreground text-lg py-2">
            Registered Events
          </p>
          <div className="grid gap-2 my-4">
            {user.events?.map((event: any, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-2 border-b border-b-foreground/30 pb-2"
              >
                <Link
                  href={`/qrcode/${event.qrId}?event=${
                    EVENTS_DETAILS[event.event.eve - 1].name
                  }`}
                  target="_blank"
                  className="flex gap-1 font-bold hover:underline underline-offset-2 items-center"
                  title="View QR Code"
                >
                  {EVENTS_DETAILS[event.event.eve - 1].name} -{" "}
                  {EVENTS_DETAILS[event.event.eve - 1].actualName}{" "}
                  <ExternalLink className="scale-75" />
                </Link>
                <div className="flex flex-col gap-1">
                  {event.event.participant.map((member: any, index: number) => (
                    <p key={index}>
                      Member {index + 1}: {member.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
