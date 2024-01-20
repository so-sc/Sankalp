"use client"

import {
  EVENTS_DETAILS,
  HACKATHON_NAME,
  genders,
  numberDisplay,
} from "@/lib/constants"
import { UserDashboardProfile } from "@/lib/types"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface UserDashboardProps {
  user: UserDashboardProfile
}

export default function UserDashboard({ user }: UserDashboardProps) {
  // const [currentData, setCurrentData] = useState<UserProfile>({
  //   ...userProfile,
  //   event: {
  //     talks: [true, true, false, true, false, false],
  //     esports: [false, true],
  //   },
  // })

  const registeredEvents = user.events?.map(
    (event) => EVENTS_DETAILS[event.event.eve - 1].name
  )

  return (
    <section>
      <p className="mb-2 border-b-2 font-semibold border-foreground text-lg py-2">
        Your Details
      </p>
      <p className="py-2 border-b border-b-foreground/10">
        Name: <span>{user.name}</span>
      </p>
      <p className="py-2 border-b border-b-foreground/10">
        Email: <span>{user.email}</span>
      </p>
      <p className="py-2 border-b border-b-foreground/10">
        Phone: <span>{user.PhNo}</span>
      </p>
      <p className="py-2 border-b border-b-foreground/10">
        Gender:{" "}
        <span>
          {/* Some stuff to make first letter capital OCD kicks in */}
          {genders[user.gender - 1][0].toUpperCase() +
            genders[user.gender - 1].slice(1)}
        </span>
      </p>
      {user.college ? (
        <>
          <p className="py-2 border-b border-b-foreground/10">
            College: <span>{user.college}</span>
          </p>
          <p className="py-2 border-b border-b-foreground/10">
            Course: <span>{user.course}</span>
          </p>
          <p className="py-2 border-b border-b-foreground/10">
            Branch: <span>{user.branch}</span>
          </p>
          <p className="py-2">
            Year of Study:{" "}
            <span>{numberDisplay[Number(user.year) - 1]} year</span>
          </p>
        </>
      ) : (
        <>
          <p className="py-2 border-b border-b-foreground/10">
            Company: <span>{user.company}</span>
          </p>
          <p className="py-2">
            Designation: <span>{user.designation}</span>
          </p>
        </>
      )}
      {user.hacks ? (
        <>
          <p className="font-semibold border-b-2 border-foreground text-lg pt-4 pb-2">
            Register for {HACKATHON_NAME} Hackathon
          </p>

          <div
            key={user.hacks.name}
            className="flex flex-col gap-2 border-b border-b-foreground/30 pb-2"
          >
            <p className="mt-4">You have registered for Hackathon</p>
            <Link
              href="/hackathon"
              target="_blank"
              className="flex gap-1 font-bold hover:underline underline-offset-2 items-center"
              title="View QR Code"
            >
              Click here to know more!
              <ExternalLink className="scale-75" />
            </Link>
          </div>
        </>
      ) : (
        <p></p>
      )}
      {/* <TalksRegistration
          setRegistrationData={setCurrentData}
          registrationData={currentData}
          isUpdation
        /> */}
    </section>
  )
}
