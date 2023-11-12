"use client"

import EventRegistration from "@/components/registration/event-registration"
import UserDisplay from "@/components/user-display"
import { UserProfile } from "@/lib/types"
import { useState } from "react"

interface UserDashboardProps {
  userProfile: UserProfile
}

export default function UserDashboard({ userProfile }: UserDashboardProps) {
  // Fetch this data from the server
  const [currentData, setCurrentData] = useState<UserProfile>({
    ...userProfile,
    event: {
      talks: [true, true, false, true, false, false],
      esports: [false, true],
    },
  })
  return (
    <section>
      <UserDisplay user={userProfile.user} />
      <div>
        <p className="text-center mt-4 bg-foreground/10 px-2 py-2">
          Register for Events
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
