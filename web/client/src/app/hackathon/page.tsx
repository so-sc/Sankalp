import HackathonRegistration from "@/components/registration/hackathon-registration"
import { H1, H2 } from "@/components/ui/typography"
import { userProfile } from "@/lib/placeholder"

export default function HackathonPage() {
  // Fetch user data from API
  const userData = {
    name: userProfile.user.name,
    email: userProfile.user.email,
    phone: userProfile.user.phone,
    year:
      userProfile.user.role.role === "student"
        ? userProfile.user.role.yearOfStudy
        : "2", // Hope this case won't come, anyways its placeholder :`)
  }
  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-12">
      <H1 className="-ml-1">Welcome Leader {userProfile.user.name}!</H1>
      <H2 className="mt-4 font-light">Register your Team for the Hackathon</H2>
      <div>
        <HackathonRegistration leader={userData} />
      </div>
    </main>
  )
}
