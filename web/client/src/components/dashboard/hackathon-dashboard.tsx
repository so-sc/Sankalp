import { Button } from "@/components/ui/button"
import Notification from "@/components/ui/notification"
import {
  EVENTS_DETAILS,
  HACKATHON_NAME,
  MAIN_EVENT_WEBSITE,
  MAX_MEMBERS,
  MIN_MEMBERS,
  THEMES,
  numberDisplay,
} from "@/lib/constants"
import {
  HackathonAPIResponse,
  HackathonDashboard,
  HackathonTeam,
  UserDashboardProfile,
} from "@/lib/types"
import Link from "next/link"
import { TbExternalLink } from "react-icons/tb"

interface HackathonDashboardProps {
  user: UserDashboardProfile | null
}

export default function HackathonDashboard({ user }: HackathonDashboardProps) {
  return (
    <div>
      {user?.hacks ? (
        <div className="mt-4">
          <div>
            <div className="mb-4">
              <p className="text-xl font-bold text-center">
                Team {user?.hacks?.name}
              </p>
              <p className="text-center">{user?.college}</p>
            </div>
            <p>
              <span className="font-bold">{THEMES[user?.hacks?.theme!]}</span>:{" "}
              {user?.hacks?.themeDesc}
            </p>
          </div>
          {user?.hacks?.member.map((member, i) => (
            <div className="flex flex-col" key={member.email}>
              <p className="text-center mx-auto my-4 bg-foreground/10 w-full rounded-lg py-1">
                Team Member {i + 1}
              </p>
              <div className="flex flex-col gap-1">
                <p>Name: {member.name}</p>
                <p>Email: {member.email}</p>
              </div>
            </div>
          ))}
          <Notification variant="success" className="my-5">
            <p>Great team! All the best folks with ❤️ SOSC</p>
          </Notification>
        </div>
      ) : (
        <div className="mt-4">
          {/* <p className="text-xl font-bold text-center mb-2">
            Register to {HACKATHON_NAME}
          </p> */}
          <div>
            <p>
              Seems like you didn&apos;t register for {HACKATHON_NAME}? Well,
              you are missing out on a lot of fun! Form a{" "}
              <span className="underline underline-offset-4">
                team of {MIN_MEMBERS} - {MAX_MEMBERS} members
              </span>
              , and build{" "}
              <span className="underline underline-offset-4">
                cool projects
              </span>{" "}
              on various themes!
            </p>
            <p className="flex gap-3 justify-center flex-wrap my-4">
              {THEMES.map((theme) => (
                <span
                  key={theme}
                  className="px-5 py-2 outline rounded-full outline-1 outline-foreground/20 bg-foreground/10"
                >
                  {theme}
                </span>
              ))}
            </p>
            <div className="flex w-full items-center flex-col gap-4 mt-5">
              <Button asChild className="w-1/2 mx-auto">
                <Link href="/hackathon" target="_blank">
                  Register Now
                </Link>
              </Button>
              <Link
                href={MAIN_EVENT_WEBSITE}
                target="_blank"
                className="flex items-center gap-2 w-fit justify-center text-sm text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                Read more about {HACKATHON_NAME} <TbExternalLink />
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* I know this is not hackathon but managing space */}
      <div>
        <p className="text-center mt-4 border-b-2 border-foreground text-lg px-2 py-2">
          Register for other exciting events
        </p>
        <div className="my-4 px-4 flex flex-col gap-2">
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
    </div>
  )
}
