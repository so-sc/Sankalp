import UserDashboard from "@/components/dashboard/user-dashboard"
import { H1, H2 } from "@/components/ui/typography"
import { HACKATHON_NAME } from "@/lib/constants"
import { userProfile } from "@/lib/placeholder"

export default function DashboardPage() {
  // userProfile will be fetched from the server
  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-12">
      <H1>DevHost 2023 - Dashboard</H1>
      <H2 className="mt-2">Welcome {userProfile.user.name}!</H2>
      <div className="grid md:grid-cols-2 mt-4 gap-4">
        <UserDashboard userProfile={userProfile} />
        <div className="pt-4 mt-8 md:pt-0 md:mt-0">
          <p className="text-center bg-foreground/10 px-2 py-2">
            {HACKATHON_NAME}
          </p>
        </div>
      </div>
    </main>
  )
}
