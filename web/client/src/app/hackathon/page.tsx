import { getUser } from "@/app/dashboard/page"
import HackathonRegistration from "@/components/registration/hackathon-registration"
import { H1, H2 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { userProfile } from "@/lib/placeholder"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hackathon",
  description: `Register for ${MAIN_EVENT_NAME} hackathon`,
}

export default async function HackathonPage() {
  const user = await getUser();

  // Fetch user data from API
  const userData = {
    name: userProfile.user.name,
    email: userProfile.user.email,
    phone: userProfile.user.phone,
    year:
      userProfile.user.role.role === "student"
        ? userProfile.user.role.yearOfStudy
        : "2", // Hope this case won't come, anyways its placeholder :`)
  };
  return (
    <main className="container max-w-5xl mx-auto px-8 lg:px-20 xl:px-24 py-12">
      <h2 className="mt-3 tracking-wide text-3xl font-bold">
        Welcome, Leader {user.data.name}!
      </h2>
      <h3 className="text-2xl mt-4 font-light">
        Register your Team for the Hackathon
      </h3>
      <div className="pb-10">
        <HackathonRegistration leader={user.data} />
      </div>
    </main>
  );
}
