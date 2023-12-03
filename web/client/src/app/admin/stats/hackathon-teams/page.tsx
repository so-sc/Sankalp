import DataTable from "@/components/tables/data-table"
import { H1, H2 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function isAdminLoggedIn() {
  const nextCookie = cookies()
  const token = nextCookie.get("admin-token")?.value

  if (!token) {
    redirect("/admin/login")
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
    redirect("/admin/login")
  }
}

import { Payment, columns } from "@/components/tables/hackathon-columns"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "am@example.com",
    },
    // ...
  ]
}

export default async function HackathonTeamsPage() {
  await isAdminLoggedIn()
  const data = await getData()

  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-10 md:py-24 flex flex-col justify-center">
      <div>
        <H1>Hackathon Teams</H1>
        <H2 className="mt-2 font-normal"> Registered for {MAIN_EVENT_NAME}</H2>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  )
}
