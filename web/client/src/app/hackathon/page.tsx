import HackathonRegistration from "@/components/registration/hackathon-registration"
import { H1, H2 } from "@/components/ui/typography"

export default function HackathonPage() {
  // Fetch this from API
  const user = "Deveesh"
  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-12">
      <H1 className="-ml-1">Welcome Leader {user}!</H1>
      <H2 className="mt-4 font-light">Register your Team for the Hackathon</H2>
      <div>
        <HackathonRegistration />
      </div>
    </main>
  )
}
