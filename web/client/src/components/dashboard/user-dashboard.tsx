import UserDisplay from "@/components/user-display"
import { UserProfile } from "@/lib/types"

interface UserDashboardProps {
  userProfile: UserProfile
}

export default function UserDashboard({ userProfile }: UserDashboardProps) {
  return (
    <section>
      <UserDisplay user={userProfile.user} />
    </section>
  )
}
