"use client"

import EventRegistration from "@/components/registration/event-registration"
import Notification from "@/components/ui/notification"
import UserDisplay from "@/components/user-display"
import { genders, numberDisplay } from "@/lib/constants"
import { UserDashboardProfile, UserProfile } from "@/lib/types"

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
  return (
    <section>
      <p className="text-center mb-2 border-b-2 border-foreground text-lg px-2 py-2">
        Attendee Details
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Name: <span className="font-bold">{user.name}</span>
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Email: <span className="font-bold">{user.email}</span>
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Phone: <span className="font-bold">{user.PhNo}</span>
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Gender:{" "}
        <span className="font-bold">
          {/* Some stuff to make first letter capital OCD kicks in */}
          {genders[user.gender - 1][0].toUpperCase() +
            genders[user.gender - 1].slice(1)}
        </span>
      </p>
      {user.college ? (
        <>
          <p className="py-1 border-b border-b-foreground/10">
            College: <span className="font-bold">{user.college}</span>
          </p>
          <p className="py-1 border-b border-b-foreground/10">
            Course: <span className="font-bold">{user.course}</span>
          </p>
          <p className="py-1 border-b border-b-foreground/10">
            Branch: <span className="font-bold">{user.branch}</span>
          </p>
          <p className="py-1">
            Year of Study:{" "}
            <span className="font-bold">
              {numberDisplay[Number(user.year) - 1]} year
            </span>
          </p>
        </>
      ) : (
        <>
          <p className="py-1 border-b border-b-foreground/10">
            Company: <span className="font-bold">{user.company}</span>
          </p>
          <p className="py-1">
            Designation: <span className="font-bold">{user.designation}</span>
          </p>
        </>
      )}
      <div>
        <p className="text-center mt-4 border-b-2 border-foreground text-lg px-2 py-2">
          Register for Events
        </p>

        <p className="text-center my-4">
          <Notification variant="info">Opening Soon... Stay Tuned</Notification>
        </p>
        {/* <EventRegistration
          setRegistrationData={setCurrentData}
          registrationData={currentData}
          isUpdation
        /> */}
      </div>
    </section>
  )
}
