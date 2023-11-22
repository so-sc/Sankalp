import HackathonDashboard from "@/components/dashboard/hackathon-dashboard"
import UserDashboard from "@/components/dashboard/user-dashboard"
import Logout from "@/components/logout"
import { H1, H2 } from "@/components/ui/typography"
import { HACKATHON_NAME, MAIN_EVENT_NAME } from "@/lib/constants"
import { getCookie } from "cookies-next"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUser() {
  const token = cookies().get("token")?.value
  if (!token) {
    redirect("/")
  }

  const isTokenValidRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token-checker`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const isTokenValid = await isTokenValidRes.json()

  if (!isTokenValid.success) {
    throw new Error("Authorization failed, please login and try again.")
  }

  console.log(token)
  // u means user
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/app/info/u`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  revalidatePath("/dashboard")
  return response.json()
}

export default async function DashboardPage() {
  const user = await getUser()

  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-10 md:py-24 flex flex-col justify-center">
      <>
        <div className="flex justify-between items-center">
          <div>
            {/* <H1>{MAIN_EVENT_NAME} - Dashboard</H1> */}
            <h2 className="mt-3 tracking-wide text-3xl font-bold">
              Welcome {user.data.name}!
            </h2>
          </div>
          <Logout />
        </div>
        <div className="grid md:grid-cols-2 md:pb-0 pb-10 tracking-wide mt-4 gap-10">
          <UserDashboard user={user.data} />
          <div className="pt-4 mt-8 md:pt-0 md:mt-0">
            <p className="font-semibold border-b-2 border-foreground text-lg py-2">
              Register for {HACKATHON_NAME} Hackathon
            </p>
            <HackathonDashboard user={user.data} />
          </div>
        </div>
      </>
    </main>
  )
}
