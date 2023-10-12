import UserDashboard from "@/components/dashboard/user-dashboard"
import { H1, H2 } from "@/components/ui/typography"
import { userProfile } from "@/lib/placeholder"

export default function DashboardPage() {
  // userProfile will be fetched from the server
  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-12">
      <H1>DevHost 2023 - Dashboard</H1>
      <H2 className="mt-2">Welcome {userProfile.user.name}!</H2>
      <div>
        <UserDashboard userProfile={userProfile} />
      </div>
    </main>
  )
}
