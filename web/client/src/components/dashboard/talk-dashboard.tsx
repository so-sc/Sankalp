import { Button } from "@/components/ui/button"
import { MAIN_EVENT_NAME, MAIN_EVENT_WEBSITE, TALKS } from "@/lib/constants"
import Link from "next/link"
import { TbExternalLink } from "react-icons/tb"

export default function TalksDashboard() {
  return (
    <div>
      <p className="mb-2 border-b-2 font-semibold border-foreground text-lg py-2">
        Register for {MAIN_EVENT_NAME} Talks
      </p>
      <div>
        <p className="flex gap-3 justify-center flex-wrap my-4">
          {TALKS.map((talk) => (
            <span
              key={talk}
              className="px-5 py-2 outline rounded-full outline-1 outline-foreground/20 bg-foreground/10"
            >
              {talk}
            </span>
          ))}
        </p>
        <div className="flex w-full items-center flex-col gap-4 mt-5">
          <Button asChild className="w-1/2 mx-auto">
            <Link href="/talks" target="_blank">
              RSVP
            </Link>
          </Button>
          <Link
            href={MAIN_EVENT_WEBSITE}
            target="_blank"
            className="flex items-center gap-2 w-fit justify-center text-sm text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors"
          >
            Read more about {MAIN_EVENT_NAME} <TbExternalLink />
          </Link>
        </div>
      </div>
    </div>
  )
}
