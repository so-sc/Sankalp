import EventDashboard from "@/components/dashboard/event-dashboard"
import { Button } from "@/components/ui/button"
import {
  HACKATHON_NAME,
  MAIN_EVENT_WEBSITE,
  MAX_MEMBERS,
  MIN_MEMBERS,
  THEMES,
} from "@/lib/constants"
import { UserDashboardProfile } from "@/lib/types"
import Link from "next/link"
import { TbExternalLink } from "react-icons/tb"

interface HackathonDashboardProps {
  user: UserDashboardProfile | null
}

export default function HackathonDashboard({ user }: HackathonDashboardProps) {
  return (
    <div>
      {user?.hacks ? (
        <p></p>
      ) : (
        <div className="mb-4">
          <p className="mb-2 border-b-2 font-semibold border-foreground text-lg py-2">
            Register for {HACKATHON_NAME} Hackathon
          </p>
          <div>
            <p className="mt-4">
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
      <EventDashboard user={user!} />
    </div>
  )
}
